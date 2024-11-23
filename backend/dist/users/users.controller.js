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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const users_service_1 = require("./users.service");
const update_user_dto_1 = require("./dto/update-user.dto");
const user_already_exists_exception_1 = require("./exceptions/user-already-exists.exception");
let UsersController = class UsersController {
    constructor(userService) {
        this.userService = userService;
    }
    async create(createUserDto) {
        try {
            if (await this.userService.create(createUserDto)) {
                return `Usuário criado com sucesso`;
            }
            else {
                throw new user_already_exists_exception_1.UserAlreadyExistsException();
            }
        }
        catch (e) {
            if (e instanceof user_already_exists_exception_1.UserAlreadyExistsException)
                throw new user_already_exists_exception_1.UserAlreadyExistsException();
            throw new common_1.HttpException({}, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async update(username, updateUserDto) {
        try {
            const id = await this.userService.findUser(username).then((user) => user._id);
            if (await this.userService.update(id.toString(), updateUserDto))
                return `Usuário atualizado com sucesso`;
        }
        catch (e) {
            throw new common_1.HttpException({}, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    delete(username) {
        try {
            const id = this.userService.findUser(username).then((user) => user._id);
            return this.userService.delete(id.toString());
        }
        catch (e) {
            throw new common_1.HttpException({}, common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Post)(':username'),
    (0, common_1.HttpCode)(200),
    __param(0, (0, common_1.Param)('username')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':username'),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Param)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delete", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map