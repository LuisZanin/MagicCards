import { 
    Body, 
    Controller, 
    Delete, 
    HttpCode, 
    HttpException, 
    HttpStatus, 
    Param, 
    Post, 
    Put,
    Logger 
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserAlreadyExistsException } from './exceptions/user-already-exists.exception';

@Controller('user')
export class UsersController {
    private readonly logger = new Logger(UsersController.name);
    constructor(private readonly userService: UsersService) {}

    @Post(":register")
    async registerUser(@Body() createUserDto: CreateUserDto) {
        try {
            const userExists = await this.userService.findUser(createUserDto.email);

            if (userExists) {
                throw new UserAlreadyExistsException();
            }

            await this.userService.create(createUserDto);
            return { message: 'Usuário criado com sucesso!' };
        } catch (e) {
            throw e;
        }
    }

    @Put(':username')
    @HttpCode(200)
    async update(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
        try {
            const user = await this.userService.findUser(username);

            if (!user) {
                throw new HttpException(
                    { error: 'Usuário não encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            await this.userService.update(user._id.toString(), updateUserDto);
            return { message: 'Usuário atualizado com sucesso!' };
        } catch (e) {
            throw new HttpException(
                { error: 'Erro ao atualizar o usuário.' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }

    @Delete(':username')
    @HttpCode(204)
    async delete(@Param('username') username: string) {
        try {
            const user = await this.userService.findUser(username);

            if (!user) {
                throw new HttpException(
                    { error: 'Usuário não encontrado.' },
                    HttpStatus.NOT_FOUND,
                );
            }

            await this.userService.delete(user._id.toString());
            return { message: 'Usuário excluído com sucesso!' };
        } catch (e) {
            throw new HttpException(
                { error: 'Erro ao excluir o usuário.' },
                HttpStatus.INTERNAL_SERVER_ERROR,
            );
        }
    }
}
