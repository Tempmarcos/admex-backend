import { BaseError } from "../baseError/BaseError";

export class cantGivePermissionError extends BaseError {
    constructor(message: string = 'Usuário não tem todas as permissões para dar ao usuário-alvo', details?: any) {
      super(403, message, details)
    }
  }