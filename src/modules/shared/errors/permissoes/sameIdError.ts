import { BaseError } from "../baseError/BaseError";

export class sameIdError extends BaseError {
    constructor(message: string = 'Usuário não pode alterar as próprias permissões', details?: any) {
      super(403, message, details)
    }
  }