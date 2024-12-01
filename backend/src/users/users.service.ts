import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './schemas/users.schema';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>){}

    async create(createUserDto: CreateUserDto): Promise<boolean> {
        if (await this.findUser(createUserDto.name)) return false;
        const salt = await bcrypt.genSalt(10);
        createUserDto.password = await bcrypt.hash(createUserDto.password, salt);
        const user = new this.userModel(createUserDto);
        await user.save();
        return true;
    }

    async findUser(email: string): Promise<User | null> {
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<User>{
        try{
            return await this.userModel.findById(id).exec();
        }catch(e){
            return null;
        }
    }

    async update(id: string, updateUserDto: UpdateUserDto): Promise<boolean> {
        try {
            if (updateUserDto.password) {
                const salt = await bcrypt.genSalt(10);
                updateUserDto.password = await bcrypt.hash(updateUserDto.password, salt);
            }
    
            await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
            return true;
        } catch (e) {
            return false;
        }
    }

    async delete(id: string){
        try{
            return await this.userModel.findByIdAndDelete(id);
        }catch(e){
            return null;
        }
    }

}