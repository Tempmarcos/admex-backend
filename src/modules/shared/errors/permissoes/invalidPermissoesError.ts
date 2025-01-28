export class InvalidPermissoesError extends Error {
    constructor() {
      super('Permissões inválidas ou inexistentes')
    }
  }