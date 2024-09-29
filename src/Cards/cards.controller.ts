import { Controller, Get, Request, UseGuards, UseInterceptors, CacheInterceptor, CacheTTL } from "@nestjs/common";
import { CardService } from "./cards.service";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @UseGuards(JwtAuthGuard)  // Protege a rota  
    @UseInterceptors(CacheInterceptor)  // Ativa o cache para a rota
    @CacheTTL(120)  // Define o tempo de cache para 120 segundos
    @Get('my-decks')
    async getMyDecks(@Request() req) {
        const userId = req.user.userId;  // Obtem o ID do jogador logado via JWT
        return this.cardService.findDecksByPlayer(userId);  
    }

    @Get('create')
    async createCards(): Promise<any> {
        return this.cardService.create();
    }
}
