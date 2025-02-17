export class BaseError extends Error {
    constructor(
      public statusCode: number,
      public message: string,
      public details?: any // Informações adicionais (opcional)
    ) {
      super(message);
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }