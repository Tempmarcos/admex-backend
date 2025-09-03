import { BaseError } from "../baseError/BaseError";

export class cantUpdateAdminError extends BaseError {
    constructor(message: string = 'Usuários admin não podem ser alterados.', details?: any) {
      super(403, message, details)
    }
  }