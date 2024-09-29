<<<<<<< HEAD
import { Controller, Get, Request, UseGuards, UseInterceptors, CacheInterceptor, CacheTTL } from "@nestjs/common";
import { CardService } from "./cards.service";
import { JwtAuthGuard } from "../auth/auth.guard";
=======
import { Body, Controller, Get, Post, Request, UseGuards } from "@nestjs/common";
import { CardService } from "./cards.service";
import { JwtAuthGuard } from "../auth/auth.guard"; 
import { CreateCardDto } from './dto/create-cards.dto';
import { ImportDeckDto } from "./dto/import-deck.dto";

>>>>>>> 0c2a926f274b970fc546501c2e50a1ea328928a2

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

    @Post('import')
    async importDeck(@Body() importDeckDto: ImportDeckDto): Promise<string> {
        return this.cardService.importDeck(importDeckDto);
    }

}
