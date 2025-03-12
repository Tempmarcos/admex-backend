import { Endereco } from "./endereco";
import { EnderecoBR } from "./enderecoBR";

export class EnderecoFactory {
    static criar(dados: any): Endereco {
      switch (dados.pais.toUpperCase()) {
        case 'BR':
          return new EnderecoBR(dados);
        // case 'US':
        //   return new EnderecoUS(
        //     dados.street,
        //     dados.city,
        //     dados.state,
        //     dados.zipCode
        //   );
        
        // case 'JP':
        //   return new EnderecoJP(
        //     dados.street,
        //     dados.city,
        //     dados.prefecture,
        //     dados.postalCode
        //   );
        
        default:
          throw new Error(`País não suportado: ${dados.pais}`);
      }
    }
  }