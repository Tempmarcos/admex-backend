import { BaseError } from "../baseError/BaseError";

export class EmailInvalidError extends BaseError {
    constructor(message: string = "E-mail inválido", details?: any) {
      super(400, message, details)
    }
  }