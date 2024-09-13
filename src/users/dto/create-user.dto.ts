import { IsString } from "class-validator";

// REPASSAR NECESSIDADE DE ATRIBUTOS, SE NECESSÁRIO, ADICIONAR OU REMOVER.

export class CreateUserDto{
    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsString()
    name: string;

    @IsString()
    email: string;

}