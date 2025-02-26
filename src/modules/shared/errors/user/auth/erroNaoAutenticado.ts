import { BaseError } from "../../baseError/BaseError";

export class erroNaoAutenticado extends BaseError {
    constructor(message: string = 'Usuário não autenticado', details?: any) {
      super(401, message, details)
    }
  }