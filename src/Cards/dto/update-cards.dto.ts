import { IsArray, IsString } from "class-validator";

export class UpdateCardDto{
    @IsString()
    Commander: string;

    @IsArray()
    card: string[];
}