import { Module, CacheModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MiddlewareConsumer } from '@nestjs/common';
import { ResLogger } from './middleware';
import { CardModule } from './Cards/cards.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/nest'),
    AuthModule,
    UsersModule,
    CardModule,
    CacheModule.register({
      ttl: 60,  // Tempo de vida do cache
      max: 100,  // Quantidade máxima de itens armazenados no cache
    }),
  ],
})
export class AppModule {
  //CASO RETIRAR MIDDLEWARE, RETIRAR CONSUMER E CONFIGURE.
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ResLogger).forRoutes('*');
  }
}
