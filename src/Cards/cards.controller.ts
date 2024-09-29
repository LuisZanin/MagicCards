import { Body, Controller, Get, Post, Request, UseGuards, UseInterceptors, BadRequestException } from "@nestjs/common";
import { CacheModule, CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';
import { CardService } from "./cards.service";
import { CreateCardDto } from './dto/create-cards.dto';
import { ImportDeckDto } from "./dto/import-deck.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles/auth.roles.guard";
import { Roles } from "src/auth/roles/decorator/auth.roles.decorator";
import { Role } from "src/auth/roles/enum/auth.roles.enum";

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @UseGuards(AuthGuard)   
    @UseInterceptors(CacheInterceptor)
    @CacheTTL(120)
    @Get('my-decks')
    async getMyDecks(@Request() req) {
        const userId = req.user.userId;
        return this.cardService.findDecksByPlayer(userId);  
    }

    @Post('create')
    async createCards(@Body() createCardDto: CreateCardDto): Promise<CreateCardDto> {
      const { deckName } = createCardDto;
  
      if (!deckName || deckName.trim() === '') {
        throw new BadRequestException('Favor Inserir um nome para o Deck');
      }
  
      return this.cardService.create(deckName);
    }

    @Post('import')
    async importDeck(@Body() importDeckDto: ImportDeckDto): Promise<string> {
        return this.cardService.importDeck(importDeckDto);
    }

    @Get('viewAllDecks')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async viewAllDecks(): Promise<CreateCardDto[]> {
        return this.cardService.viewAllDecks();
    }

}