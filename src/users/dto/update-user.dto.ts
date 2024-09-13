import { IsOptional, IsString } from "class-validator";

// REPASSAR NECESSIDADE DE ATRIBUTOS, SE NECESSÁRIO, ADICIONAR OU REMOVER.

export class UpdateUserDto{
    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    email: string;

}