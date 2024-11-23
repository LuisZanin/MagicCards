import { Document } from "mongoose";
export type CardDocument = Cards & Document;
export declare class Cards {
    deckName: string;
    Commander: string;
    card: string[];
}
export declare const CardSchema: import("mongoose").Schema<Cards, import("mongoose").Model<Cards, any, any, any, Document<unknown, any, Cards> & Cards & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Cards, Document<unknown, {}, import("mongoose").FlatRecord<Cards>> & import("mongoose").FlatRecord<Cards> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v?: number;
}>;
