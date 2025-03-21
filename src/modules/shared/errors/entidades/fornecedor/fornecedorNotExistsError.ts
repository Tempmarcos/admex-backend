import { BaseError } from "../../baseError/BaseError";


export class FornecedorNotExistsError extends BaseError {
    constructor(message: string = "Fornecedor não existe", details?: any) {
      super(400, message, details)
    }
  }