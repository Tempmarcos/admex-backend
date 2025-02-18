import { BaseError } from "../baseError/BaseError";

export class InvalidPermissoesError extends BaseError {
    constructor(message: string = "Permissões inválidas ou inexistentes", details?: any) {
      super(400, message, details)
    }
  }