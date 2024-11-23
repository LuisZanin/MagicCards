import { Model } from "mongoose";
import { CreateCardDto } from "./dto/create-cards.dto";
import { CardDocument } from "./cards.schema";
import { ImportDeckDto } from "./dto/import-deck.dto";
export declare class CardService {
    private cardModel;
    constructor(cardModel: Model<CardDocument>);
    importDeck(importDeckDto: ImportDeckDto): Promise<string>;
    private getCardInfo;
    private getCommanderInfo;
    private validateNoDuplicates;
    private validateCardColors;
    findDecksByPlayer(playerId: string): Promise<CardDocument[]>;
    create(deckName: string): Promise<CreateCardDto>;
    viewAllDecks(): Promise<CreateCardDto[]>;
    private getCommander;
    private getOtherCards;
    private getCardName;
    private getRandomizedCards;
    private shuffleArray;
}
