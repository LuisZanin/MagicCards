import { IsArray, IsString } from "class-validator";

export class CreateCardDto {
    @IsString()
    Commander: string;

    @IsArray()
    card: string[];
}