import { BaseError } from "../baseError/BaseError";

export class InvalidNameError extends BaseError {
    constructor(message: string = "Nome inválido", details?: any) {
      super(400, message, details)
    }
  }