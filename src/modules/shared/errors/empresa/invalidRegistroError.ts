import { BaseError } from "../baseError/BaseError";

export class InvalidRegistroError extends BaseError {
    constructor(message: string = "Registro inválido", details?: any) {
      super(400, message, details)
    }
  }