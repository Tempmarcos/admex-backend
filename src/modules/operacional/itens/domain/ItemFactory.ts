import { InvalidItemError } from "../../../shared/errors/item/invalidItemError";
import { ProdutoRepository } from "../infra/repositories/prisma/produtoRepository";
import { ServicoRepository } from "../infra/repositories/prisma/servicoRepository";


export class ItemFactory {
    static criarRepositorio(tipo: string) {
      switch (tipo) {
        case 'produto':
          return new ProdutoRepository();
        case 'servico':
          return new ServicoRepository();
        default:
          throw new InvalidItemError();
      }
    }
  }