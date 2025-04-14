import { BaseError } from "../baseError/BaseError";

export class VersaoNotExistsError extends BaseError {
    constructor(message: string = "Versão não existe", details?: any) {
      super(400, message, details)
    }
  }