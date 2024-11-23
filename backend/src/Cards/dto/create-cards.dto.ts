import { IsArray, IsString } from "class-validator";

export class CreateCardDto {
    @IsString()
    deckName: string;

    @IsString()
    Commander: string;

    @IsArray()
    card: string[];
}