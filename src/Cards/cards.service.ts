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
          'https://api.scryfall.com/cards/random?q=is%3Acommander',
        );
        const commanderCards = response.data;
        return commanderCards;
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
    
      private async getRandomizedCards(cards: any[], count: number): Promise<any[]> {
        if (cards.length < count) {
            throw new Error("Not enough unique cards available to fulfill the request");
        }
    
        const uniqueCards = new Set();
        const shuffledCards = this.shuffleArray(cards);
    
        for (const card of shuffledCards) {
            if (uniqueCards.size >= count) {
                break;
            }
            const cardName = this.getCardName(card);
            if (!uniqueCards.has(cardName)) {
                uniqueCards.add(cardName);
            }
        }
    
        return Array.from(uniqueCards).map(name => cards.find(card => this.getCardName(card) === name));
    }
    
    private shuffleArray(array: any[]): any[] {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
}

