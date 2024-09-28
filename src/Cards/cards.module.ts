
/*
import { Module } from '@nestjs/common';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';

//ANALISAR, TAMBEM NAO SEI

@Module({
  providers: [CardService],
  controllers: [CardController]
})
export class CardModule {}
*/

//ALTERAÇOES MAMI PARA SALVAR O DECK NO MONGO ABAIXO:
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';
import { Cards, CardSchema } from './cards.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cards.name, schema: CardSchema }])],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}