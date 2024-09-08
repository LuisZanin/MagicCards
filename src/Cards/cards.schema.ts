import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";

@Schema()
export class cards{
    @Prop()
    Commander: string;

    @Prop()
    card: string[];
    
}