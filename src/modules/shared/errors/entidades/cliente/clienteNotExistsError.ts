import { BaseError } from "../../baseError/BaseError";


export class ClienteNotExistsError extends BaseError {
    constructor(message: string = "Cliente não existe", details?: any) {
      super(400, message, details)
    }
  }