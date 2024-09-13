import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";

//POSSIVELMENTE NECESSARIO MELHORAR(NAO SEI DIREITO O POR QUE)

@Schema()
export class cards{
    @Prop()
    Commander: string;

    @Prop()
    card: string[];
    
}