import { BaseError } from "../baseError/BaseError";

export class ServicoNotExistsError extends BaseError {
    constructor(message: string = "Serviço não existe", details?: any) {
      super(400, message, details)
    }
  }