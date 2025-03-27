import { BaseError } from "../baseError/BaseError";

export class ItemNotExistsError extends BaseError {
    constructor(message: string = "Item não existe", details?: any) {
      super(400, message, details)
    }
  }