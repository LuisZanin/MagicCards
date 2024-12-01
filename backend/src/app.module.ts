import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { ResLogger } from './middleware';
import { CardModule } from './Cards/cards.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/MagicDB'),
    AuthModule,
    UsersModule,
    CardModule,
    CacheModule.register({
      ttl: 60, 
      max: 100,
    }),
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResLogger).forRoutes('*');
  }
}
