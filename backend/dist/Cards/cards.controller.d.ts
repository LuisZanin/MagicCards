import { CardService } from "./cards.service";
import { CreateCardDto } from './dto/create-cards.dto';
import { ImportDeckDto } from "./dto/import-deck.dto";
export declare class CardController {
    private readonly cardService;
    constructor(cardService: CardService);
    getMyDecks(req: any): Promise<import("./cards.schema").CardDocument[]>;
    createCards(createCardDto: CreateCardDto): Promise<CreateCardDto>;
    importDeck(importDeckDto: ImportDeckDto): Promise<string>;
    viewAllDecks(): Promise<CreateCardDto[]>;
}
