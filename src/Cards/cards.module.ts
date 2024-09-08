import { Module } from '@nestjs/common';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';

@Module({
  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}