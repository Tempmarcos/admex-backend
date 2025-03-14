import { BaseError } from "../baseError/BaseError";

export class EmpresaNotExistsError extends BaseError {
    constructor(message: string = "Empresa não existe", details?: any) {
      super(400, message, details)
    }
  }