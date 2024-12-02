import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Role } from "src/auth/roles/enum/auth.roles.enum";
import * as mongoose from 'mongoose';

@Schema()
export class User {
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, auto: true })
    _id: mongoose.Schema.Types.ObjectId;

    @Prop()
    name: string;
    
    @Prop()
    email: string;
    
    @Prop()
    password: string;

    @Prop({
        type: [String], 
        enum: Role,
        default: [Role.USER],
    })
    roles: Role[];
}

export const UserSchema = SchemaFactory.createForClass(User);
