import { Controller, Get } from "@nestjs/common";
import { CardService } from "./cards.service";
import { CreateCardDto } from "./dto/create-cards.dto";

//ADICIONAR MAIS ROTAS

@Controller('card')
export class CardController {
    constructor(private readonly cardService: CardService) {}

    @Get('create')
    async createCards(): Promise<CreateCardDto> {
        return this.cardService.create();
    }
}
