import { BaseError } from "../baseError/BaseError";

export class InvalidEntityError extends BaseError {
    constructor(message: string = "Tipo de entidade inválida", details?: any) {
      super(400, message, details)
    }
  }