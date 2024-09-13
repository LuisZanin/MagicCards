import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserShema } from './schemas/users.schema';
import { UsersController } from './users.controller';
import { hashPassword } from './middleware/users.middleware';

//ANALISAR, NÃO SEI DIREITO O QUE FAZ

@Module({
  imports: [MongooseModule.forFeature([{name: User.name, schema: UserShema}])],
  providers: [UsersService],
  exports: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {
  configure(consumer: MiddlewareConsumer){
    consumer.apply(hashPassword)
    .forRoutes({ path: 'user', method: RequestMethod.POST })};
}