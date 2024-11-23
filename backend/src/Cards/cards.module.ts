import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CardService } from './cards.service';
import { CardController } from './cards.controller';
import { Cards, CardSchema } from './cards.schema';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [MongooseModule.forFeature([{ name: Cards.name, schema: CardSchema,
   }]),
  CacheModule.register()],
  providers: [CardService],
  controllers: [CardController],
})
export class CardModule {}