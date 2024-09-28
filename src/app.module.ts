import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { ResLogger } from './middleware';
import { CardModule } from './cards/cards.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'), 
    AuthModule, 
    UsersModule, 
    CardModule],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(ResLogger)
    .forRoutes('*');
}
}