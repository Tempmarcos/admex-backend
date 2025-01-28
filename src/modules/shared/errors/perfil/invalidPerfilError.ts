export class InvalidPerfilError extends Error {
    constructor() {
      super('Dados do perfil inválidos')
    }
  }