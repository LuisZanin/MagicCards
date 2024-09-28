import { BadRequestException, Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { CardService } from "./cards.service";
import { CreateCardDto } from "./dto/create-cards.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { RolesGuard } from "src/auth/roles/auth.roles.guard";
import { Roles } from "src/auth/roles/decorator/auth.roles.decorator";
import { Role } from "src/auth/roles/enum/auth.roles.enum";

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Post('create')
    async createCards(@Body() createCardDto: CreateCardDto): Promise<CreateCardDto> {
      const { deckName } = createCardDto;
  
      if (!deckName || deckName.trim() === '') {
        throw new BadRequestException('Favor Inserir um nome para o Deck');
      }
  
      return this.cardService.create(deckName);
    }

    @Get('viewAllDecks')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles(Role.Admin)
    async viewAllDecks(): Promise<CreateCardDto[]> {
        return this.cardService.viewAllDecks();
    }
}
