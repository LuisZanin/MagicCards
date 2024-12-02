import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import axios, { AxiosResponse } from "axios";
import { CreateCardDto } from "./dto/create-cards.dto";
import { Cards, CardDocument } from "./cards.schema";
import { ImportDeckDto } from "./dto/import-deck.dto";
import * as amqp from 'amqplib';

@Injectable()
export class CardService {
  constructor(@InjectModel(Cards.name) private cardModel: Model<CardDocument>) {}

async importDeck(importDeckDto: ImportDeckDto): Promise<string> {
  const { Commander, card } = importDeckDto;

  // 1. Verificar quantidade de cartas
  if (card.length !== 99) {
    throw new BadRequestException('O deck precisa ter exatamente 99 cartas além do comandante.');
  }

  // 2. Validar se o comandante é uma criatura lendária
  const commanderInfo = await this.getCommanderInfo(Commander);
  if (!commanderInfo || !commanderInfo.supertypes.includes('Legendary') || commanderInfo.types[0] !== 'Creature') {
    throw new BadRequestException('O comandante precisa ser uma criatura lendária.');
  }

  // 3. Verificar se as cores das cartas batem com as cores do comandante
  const commanderColors = commanderInfo.colors || [];
  for (const cardName of card) {
    const cardInfo = await this.getCardInfo(cardName);
    if (!this.validateCardColors(cardInfo, commanderColors)) {
      throw new BadRequestException(`A carta ${cardName} não é compatível com as cores do comandante.`);
    }
  }

  // 4. Verificar se o deck tem cartas duplicadas
  const cardSet = new Set(card);
  if (cardSet.size !== card.length) {
    throw new BadRequestException('O deck contém cartas duplicadas, o que não é permitido exceto para terrenos básicos.');
  }

  // 5. Salvar o deck no banco de dados
  const newDeck = new this.cardModel({
    Commander: Commander,
    card: card,
  });
  await newDeck.save();

  return 'Deck importado e validado com sucesso!';
}

// Função para obter as informações de uma carta por nome
  private async getCardInfo(name: string): Promise<any> {
    const response: AxiosResponse = await axios.get(
    `https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(name)}`
);
  return response.data.cards[0];
}

// Função para obter as informações detalhadas de um comandante por nome
  private async getCommanderInfo(name: string): Promise<any> {
    const response: AxiosResponse = await axios.get(
    `https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(name)}`
);
  return response.data.cards[0]; // Retornar a primeira carta correspondente
}

  // Verificar se há duplicatas no deck (exceto terrenos básicos)
  private validateNoDuplicates(cardNames: string[]): boolean {
    const cardSet = new Set(cardNames);
    return cardSet.size === cardNames.length; // Verifica se há duplicatas
  }

  // Verificar se a carta é compatível com as cores do comandante
  private validateCardColors(card: any, commanderColors: string[]): boolean {
    if (!card.colors) return true; // Cartas incolores são sempre válidas
    return card.colors.every((color: string) => commanderColors.includes(color));
  }



  // Função para buscar os decks do jogador logado
  async findDecksByPlayer(email: string): Promise<CardDocument[]> {
    return this.cardModel.find({ email }).exec();  // Filtra os baralhos pelo ID do jogador
  }

  async create(deckName: string): Promise<CreateCardDto> {
    const commander = await this.getCommander();
    const commanderName = this.getCardName(commander);
    const otherCards = await this.getOtherCards(commander.colors || []);
    const cardNames = otherCards.map(this.getCardName);

    const newDeck = new this.cardModel({
      deckName: deckName,
      Commander: commanderName,
      card: cardNames,
    });
    await newDeck.save();

    await this.publishDeckCreatedEvent(newDeck);

    return {
      deckName: deckName,
      Commander: commanderName,
      card: cardNames,
    };
  }

  private async publishDeckCreatedEvent(deck: any) {
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();
    const exchange = 'deck_created_exchange';

    await channel.assertExchange(exchange, 'fanout', { durable: false });
    channel.publish(exchange, '', Buffer.from(JSON.stringify(deck)));

    console.log('Evento de criação de deck publicado no RabbitMQ');

    await channel.close();
    await connection.close();
  }

  async viewAllDecks(): Promise<CreateCardDto[]> {
    const decks = await this.cardModel.find().exec();
    return decks.map((deck) => ({
      deckName: deck.deckName,
      Commander: deck.Commander,
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
