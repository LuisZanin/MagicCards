import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cards, CardDocument } from "./cards.schema";
import axios, { AxiosResponse } from "axios";
import { CreateCardDto } from "./dto/create-cards.dto";

// ADICIONAR MAIS MÉTODOS, COMO POR EXEMPLO IMPORTAÇÃO DE DECKS E OUTROS. 
// VERIFICAR TERRENOS, NÃO PENSEI NA HORA FAZER.
// VERIFICAR MONSTROS E OUTROS CARDS, NÃO PENSEI NA HORA FAZER.

@Injectable()
export class CardService {
  constructor(@InjectModel(Cards.name) private cardModel: Model<CardDocument>) {}

  async create(): Promise<CreateCardDto> {
    const Commander = await this.getCommander();
    const commanderName = this.getCardName(Commander);
    const otherCards = await this.getOtherCards(Commander.colors || []);
    const cardNames = otherCards.map(this.getCardName);

    // ADIÇÃO MAMI PARA SALVAR O DECK NO MONGO, ALTERADO IMPORTS VERIFICAR QUEM USAVA
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
    

      //ADICIONAR VALIDAÇÃO DE CARDS REPETIDOS
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

