export class EmailInvalidError extends Error {
    constructor() {
      super('Precisa ser um email válido')
    }
  }