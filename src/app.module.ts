import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { ResLogger } from './middleware';
import { CardModule } from './cards/cards.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/magic'), 
    AuthModule, 
    UsersModule, 
    CardModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(ResLogger)
    .forRoutes('*');
}
}