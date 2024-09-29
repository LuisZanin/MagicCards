import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cards, CardDocument } from "./cards.schema";
import axios, { AxiosResponse } from "axios";
import { CreateCardDto } from "./dto/create-cards.dto";

@Injectable()
export class CardService {
  constructor(@InjectModel(Cards.name) private cardModel: Model<CardDocument>) {}

  // Função para buscar os decks do jogador logado
  async findDecksByPlayer(playerId: string): Promise<CardDocument[]> {
    return this.cardModel.find({ playerId }).exec();  // Filtra os baralhos pelo ID do jogador
  }

  // Função existente de criação de um novo deck
  async create(): Promise<CreateCardDto> {
    const Commander = await this.getCommander();
    const commanderName = this.getCardName(Commander);
    const otherCards = await this.getOtherCards(Commander.colors || []);
    const cardNames = otherCards.map(this.getCardName);

    // Salvando o novo deck no banco de dados
    const newDeck = new this.cardModel({
      Commander: commanderName,
      card: cardNames,
    });
    await newDeck.save();

    return {
      Commander: commanderName,
      card: cardNames,
    };
  }

  private async getCommander(): Promise<any> {
    const response: AxiosResponse = await axios.get(
      'https://api.magicthegathering.io/v1/cards?supertypes=legendary',
    );
    const commanderCards = response.data.cards;
    return commanderCards[Math.floor(Math.random() * commanderCards.length)];
  }

  private async getOtherCards(colors: string[]): Promise<any[]> {
    const colorQuery = colors.join(',');
    const response: AxiosResponse = await axios.get(
      `https://api.magicthegathering.io/v1/cards?colors=${colorQuery}&supertypes!=legendary`,
    );
    const nonLegendaryCards = response.data.cards;

    return this.getRandomizedCards(nonLegendaryCards, 99);
  }

  private getCardName(card: any): string {
    return card.name;
  }

  private getRandomizedCards(cards: any[], count: number): any[] {
    const randomizedCards = [];
    for (let i = 0; i < count; i++) {
      const randomCard = cards[Math.floor(Math.random() * cards.length)];
      randomizedCards.push(randomCard);
    }
    return randomizedCards;
  }
}
