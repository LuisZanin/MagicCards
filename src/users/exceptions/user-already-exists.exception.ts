import { HttpException, HttpStatus } from "@nestjs/common";

//ADICIONAR MAIS EXCEPTIONS (EMAIL DUPLICADO, USERNAME DUPLICADO)

export class UserAlreadyExistsException extends HttpException {
    constructor() {
      super('Usuário já existe', HttpStatus.BAD_REQUEST);
    }
  }