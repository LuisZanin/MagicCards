import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CardService } from "./cards.service";
import { CreateCardDto } from "./dto/create-cards.dto";

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post('create')
    async createCards(@Body() CreateCardDto: CreateCardDto): Promise<CreateCardDto> {
        const { deckName } = CreateCardDto;
        return this.cardService.create(deckName);
    }

    @Get('viewAllDecks')
    async viewAllDecks(): Promise<CreateCardDto[]> {
        return this.cardService.viewAllDecks();
    }
}
