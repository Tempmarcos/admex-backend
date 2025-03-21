import { BaseError } from "../baseError/BaseError";

export class EntityNotExistsError extends BaseError {
    constructor(message: string = "Entidade não existe", details?: any) {
      super(400, message, details)
    }
  }