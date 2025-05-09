import { BaseError } from "../baseError/BaseError";

export class EmailNotExistsError extends BaseError {
    constructor(message: string = "E-mail não existe", details?: any) {
      super(400, message, details)
    }
  }