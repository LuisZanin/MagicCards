import * as mongoose from 'mongoose';
export declare class User {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    password: string;
    name: string;
    email: string;
}
export declare const UserShema: mongoose.Schema<User, mongoose.Model<User, any, any, any, mongoose.Document<unknown, any, User> & User & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v?: number;
}, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, User, mongoose.Document<unknown, {}, mongoose.FlatRecord<User>> & mongoose.FlatRecord<User> & Required<{
    _id: mongoose.Schema.Types.ObjectId;
}> & {
    __v?: number;
}>;
