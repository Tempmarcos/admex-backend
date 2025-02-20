import { BaseError } from "../baseError/BaseError";

export class SenhaErradaError extends BaseError {
    constructor(message: string = "Senha errada", details?: any) {
      super(409, message, details)
    }
  }