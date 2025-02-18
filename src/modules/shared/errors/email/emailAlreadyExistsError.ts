import { BaseError } from "../baseError/BaseError";

export class EmailAlreadyExistsError extends BaseError {
    constructor(message: string = 'Email já está em uso', details?: any) {
      super(409, message, details)
    }
  }