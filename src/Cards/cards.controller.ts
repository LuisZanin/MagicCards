import { Controller, Get, Request, UseGuards } from "@nestjs/common";
import { CardService } from "./cards.service";
import { JwtAuthGuard } from "../auth/auth.guard"; 
import { CreateCardDto } from './dto/create-cards.dto';


@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @UseGuards(JwtAuthGuard)  // Protegendo a rota
    @Get('my-decks')
    async getMyDecks(@Request() req) {
        const userId = req.user.userId;  // Obtem o ID do jogador logado via JWT
        return this.cardService.findDecksByPlayer(userId);
    }

    @Get('create')
    async createCards(): Promise<CreateCardDto> {
        return this.cardService.create();
    }
}
