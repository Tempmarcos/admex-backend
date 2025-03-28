import { InvalidEntityError } from "../../../../shared/errors/entidades/IvalidEntityError";
import { clienteSchema } from "../../dtos/cliente/createClienteDTO";
import { fornecedorSchema } from "../../dtos/fornecedor/createFornecedorDTO";
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

    static criarDTO(tipo: string) {
      switch (tipo) {
        case 'cliente':
          return clienteSchema;
        case 'fornecedor':
          return fornecedorSchema;
        default:
          throw new InvalidEntityError();
      }
    }
  }