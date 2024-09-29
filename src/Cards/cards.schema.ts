import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CardDocument = Cards & Document;

@Schema()
export class Cards {
  @Prop({ required: true })
  deckName: string;

  @Prop({ required: true })
  Commander: string;

  @Prop({ required: true })
  card: string[];
}

export const CardSchema = SchemaFactory.createForClass(Cards);
