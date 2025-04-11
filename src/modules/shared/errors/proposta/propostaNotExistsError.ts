import { BaseError } from "../baseError/BaseError";

export class PropostaNotExistsError extends BaseError {
    constructor(message: string = "Proposta não existe", details?: any) {
      super(400, message, details)
    }
  }