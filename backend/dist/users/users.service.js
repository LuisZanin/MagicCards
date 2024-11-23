"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const users_schema_1 = require("./schemas/users.schema");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async create(createUserDto) {
        if (await this.findUser(createUserDto.username))
            return false;
        const char = new this.userModel(createUserDto);
        await char.save();
        return true;
    }
    async findUser(user) {
        try {
            return await this.userModel.findOne({ username: user });
        }
        catch (e) {
            return null;
        }
    }
    async findById(id) {
        try {
            return await this.userModel.findById(id).exec();
        }
        catch (e) {
            return null;
        }
    }
    async update(id, updateUserDto) {
        try {
            await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
            return true;
        }
        catch (e) {
            return null;
        }
    }
    async delete(id) {
        try {
            return await this.userModel.findByIdAndDelete(id);
        }
        catch (e) {
            return null;
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map