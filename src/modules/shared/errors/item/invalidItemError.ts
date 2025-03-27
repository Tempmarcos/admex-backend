import { BaseError } from "../baseError/BaseError";

export class InvalidItemError extends BaseError {
    constructor(message: string = "Tipo de item inválido", details?: any) {
      super(400, message, details)
    }
  }