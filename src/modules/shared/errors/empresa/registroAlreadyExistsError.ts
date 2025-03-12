import { BaseError } from "../baseError/BaseError";

export class RegistroAlreadyExistsError extends BaseError {
    constructor(message: string = 'Registro de empresa já está em uso', details?: any) {
      super(409, message, details)
    }
  }