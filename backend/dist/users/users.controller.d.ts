import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UsersController {
    private readonly userService;
    constructor(userService: UsersService);
    create(createUserDto: CreateUserDto): Promise<string>;
    update(username: string, updateUserDto: UpdateUserDto): Promise<string>;
    delete(username: string): Promise<import("mongoose").Document<unknown, {}, import("./schemas/users.schema").User> & import("./schemas/users.schema").User & Required<{
        _id: import("mongoose").Schema.Types.ObjectId;
    }> & {
        __v?: number;
    }>;
}
