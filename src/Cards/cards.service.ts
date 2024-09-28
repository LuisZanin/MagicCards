import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Cards, CardDocument } from "./cards.schema";
import axios, { AxiosResponse } from "axios";
import { CreateCardDto } from "./dto/create-cards.dto";

@Injectable()
export class CardService {
  constructor(@InjectModel(Cards.name) private cardModel: Model<CardDocument>) {}

  async create(deckName: string): Promise<CreateCardDto> {
    const commander = await this.getCommander();
    const commanderName = this.getCardName(commander);
    const otherCards = await this.getOtherCards(commander.colors || []);
    const cardNames = otherCards.map(this.getCardName);

    const newDeck = new this.cardModel({
      deckName: deckName,
      commander: commanderName,
      card: cardNames,
    });
    await newDeck.save();

    return {
      deckName: deckName,
      commander: commanderName,
      card: cardNames,
    };
  }

  async viewAllDecks(): Promise<CreateCardDto[]> {
      const decks = await this.cardModel.find().exec();
      return decks.map((deck) => ({
        deckName: deck.deckName,
        commander: deck.commander,
        card: deck.card,
      }));
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

