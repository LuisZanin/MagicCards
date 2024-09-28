import { IsArray, IsString } from "class-validator";

export class CreateCardDto {
    @IsString()
    deckName: string;

    @IsString()
    commander: string;

    @IsArray()
    card: string[];
}