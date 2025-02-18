import { BaseError } from "../baseError/BaseError";

export class InvalidPerfilError extends BaseError {
    constructor(message: string = "Dados do perfil inválidos", details?: any) {
      super(400, message, details)
    }
  }