import { BaseError } from "../baseError/BaseError";

export class InvalidIDError extends BaseError {
    constructor(message: string = 'ID de usuário inválido', details?: any) {
      super(400, message, details)
    }
  }