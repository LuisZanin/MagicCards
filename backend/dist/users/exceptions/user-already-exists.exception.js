"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserAlreadyExistsException = void 0;
const common_1 = require("@nestjs/common");
class UserAlreadyExistsException extends common_1.HttpException {
    constructor() {
        super('Usuário já existe', common_1.HttpStatus.BAD_REQUEST);
    }
}
exports.UserAlreadyExistsException = UserAlreadyExistsException;
//# sourceMappingURL=user-already-exists.exception.js.map