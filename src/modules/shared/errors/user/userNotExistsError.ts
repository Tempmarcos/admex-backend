import { BaseError } from "../baseError/BaseError";

export class UserNotExistsError extends BaseError {
    constructor(message: string = "Usuário não existe", details?: any) {
      super(400, message, details)
    }
  }