import { BaseError } from "../baseError/BaseError";

export class InvalidSenhaError extends BaseError {
    constructor(message: string = "Senha inválida", details?: any) {
      super(400, message, details)
    }
  }