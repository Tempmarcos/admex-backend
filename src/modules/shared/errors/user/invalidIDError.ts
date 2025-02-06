export class InvalidIDError extends Error {
    constructor() {
      super('ID de usuário inválido')
    }
  }