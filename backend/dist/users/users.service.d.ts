import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { Model } from 'mongoose';
export declare class UsersService {
    private readonly userModel;
    constructor(userModel: Model<User>);
    create(createUserDto: CreateUserDto): Promise<boolean>;
    findUser(user: string): Promise<User>;
    findById(id: string): Promise<User>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<boolean>;
    delete(id: string): Promise<import("mongoose").Document<unknown, {}, User> & User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v?: number;
    }>;
}
