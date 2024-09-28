
/*
import { Prop, Schema, SchemaFactory, raw } from "@nestjs/mongoose";

//POSSIVELMENTE NECESSARIO MELHORAR(NAO SEI DIREITO O POR QUE)

@Schema()
export class cards{
    @Prop()
    Commander: string;

    @Prop()
    card: string[];
    
}
*/

//ALTERAÇOES MAMI PARA BANCO DE DADOS ABAIXO
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CardDocument = Cards & Document;

@Schema()
export class Cards {
  @Prop({ required: true })
  Commander: string;

  @Prop({ required: true })
  card: string[];
}

export const CardSchema = SchemaFactory.createForClass(Cards);
