import { BaseError } from "../baseError/BaseError";

export class MesmaSenhaError extends BaseError {
    constructor(message: string = "As senhas são idênticas", details?: any) {
      super(400, message, details)
    }
  }