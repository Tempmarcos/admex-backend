import { InvalidEntityError } from "../../../../shared/errors/entidades/IvalidEntityError";
import { ClienteRepository } from "../../infra/repositories/prisma/clienteRepository";
import { FornecedorRepository } from "../../infra/repositories/prisma/fornecedorRepository";

export class EntidadeTerceiraFactory {
    static criarRepositorio(tipo: string) {
      switch (tipo) {
        case 'cliente':
          return new ClienteRepository();
        case 'fornecedor':
          return new FornecedorRepository();
        default:
          throw new InvalidEntityError();
      }
    }
  }