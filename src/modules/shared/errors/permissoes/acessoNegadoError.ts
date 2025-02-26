import { BaseError } from "../baseError/BaseError";

export class acessoNegadoError extends BaseError {
    constructor(message: string = 'Acesso negado', details?: any) {
      super(403, message, details)
    }
  }