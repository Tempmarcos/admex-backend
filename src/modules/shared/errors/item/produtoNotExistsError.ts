import { BaseError } from "../baseError/BaseError";

export class ProdutoNotExistsError extends BaseError {
    constructor(message: string = "Produto não existe", details?: any) {
      super(400, message, details)
    }
  }