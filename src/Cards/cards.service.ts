import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import axios, { AxiosResponse } from "axios";
import { CreateCardDto } from "./dto/create-cards.dto";
<<<<<<< HEAD
import { Cards, CardDocument } from "./cards.schema";  
=======
import { ImportDeckDto } from "./dto/import-deck.dto";
>>>>>>> 0c2a926f274b970fc546501c2e50a1ea328928a2

@Injectable()
export class CardService {
  constructor(@InjectModel(Cards.name) private cardModel: Model<CardDocument>) {}

// Importar deck via JSON
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

  // Validação de cards repetidos
  private async getOtherCards(colors: string[]): Promise<any[]> {
    const colorQuery = colors.join(',');
    const response: AxiosResponse = await axios.get(
      `https://api.magicthegathering.io/v1/cards?colors=${colorQuery}&supertypes!=legendary`,
    );
    const nonLegendaryCards = response.data.cards;

    return this.getRandomizedCards(nonLegendaryCards, 99);  // Retorna os 99 cards
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
