import { BaseError } from "../baseError/BaseError";

export class MesmoEmailError extends BaseError {
    constructor(message: string = "Os Emails são idênticos", details?: any) {
      super(400, message, details)
    }
  }