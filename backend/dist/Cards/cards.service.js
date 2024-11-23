"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const axios_1 = require("axios");
const cards_schema_1 = require("./cards.schema");
let CardService = class CardService {
    constructor(cardModel) {
        this.cardModel = cardModel;
    }
    async importDeck(importDeckDto) {
        const { Commander, card } = importDeckDto;
        if (card.length !== 99) {
            throw new common_1.BadRequestException('O deck precisa ter exatamente 99 cartas além do comandante.');
        }
        const commanderInfo = await this.getCommanderInfo(Commander);
        if (!commanderInfo || !commanderInfo.supertypes.includes('Legendary') || commanderInfo.types[0] !== 'Creature') {
            throw new common_1.BadRequestException('O comandante precisa ser uma criatura lendária.');
        }
        const commanderColors = commanderInfo.colors || [];
        for (const cardName of card) {
            const cardInfo = await this.getCardInfo(cardName);
            if (!this.validateCardColors(cardInfo, commanderColors)) {
                throw new common_1.BadRequestException(`A carta ${cardName} não é compatível com as cores do comandante.`);
            }
        }
        const cardSet = new Set(card);
        if (cardSet.size !== card.length) {
            throw new common_1.BadRequestException('O deck contém cartas duplicadas, o que não é permitido exceto para terrenos básicos.');
        }
        const newDeck = new this.cardModel({
            Commander: Commander,
            card: card,
        });
        await newDeck.save();
        return 'Deck importado e validado com sucesso!';
    }
    async getCardInfo(name) {
        const response = await axios_1.default.get(`https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(name)}`);
        return response.data.cards[0];
    }
    async getCommanderInfo(name) {
        const response = await axios_1.default.get(`https://api.magicthegathering.io/v1/cards?name=${encodeURIComponent(name)}`);
        return response.data.cards[0];
    }
    validateNoDuplicates(cardNames) {
        const cardSet = new Set(cardNames);
        return cardSet.size === cardNames.length;
    }
    validateCardColors(card, commanderColors) {
        if (!card.colors)
            return true;
        return card.colors.every((color) => commanderColors.includes(color));
    }
    async findDecksByPlayer(playerId) {
        return this.cardModel.find({ playerId }).exec();
    }
    async create(deckName) {
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
        return {
            deckName: deckName,
            Commander: commanderName,
            card: cardNames,
        };
    }
    async viewAllDecks() {
        const decks = await this.cardModel.find().exec();
        return decks.map((deck) => ({
            deckName: deck.deckName,
            Commander: deck.Commander,
            card: deck.card,
        }));
    }
    async getCommander() {
        const response = await axios_1.default.get('https://api.scryfall.com/cards/random?q=is%3Acommander');
        const commanderCards = response.data;
        return commanderCards;
    }
    async getOtherCards(colors) {
        const colorQuery = colors.join(',');
        const response = await axios_1.default.get(`https://api.magicthegathering.io/v1/cards?colors=${colorQuery}&supertypes!=legendary`);
        const nonLegendaryCards = response.data.cards;
        return this.getRandomizedCards(nonLegendaryCards, 99);
    }
    getCardName(card) {
        return card.name;
    }
    async getRandomizedCards(cards, count) {
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
    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
};
exports.CardService = CardService;
exports.CardService = CardService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(cards_schema_1.Cards.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CardService);
//# sourceMappingURL=cards.service.js.map