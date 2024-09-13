import { Module } from '@nestjs/common';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';

//ANALISAR, TAMBEM NAO SEI

@Module({
  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}