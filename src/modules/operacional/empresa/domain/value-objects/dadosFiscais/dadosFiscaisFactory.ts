import { DadosFiscais } from "./dadosFiscais";
import { DadosFiscaisBR } from "./dadosFiscaisBR";

class DadosFiscaisFactory {
    static criar(pais: string, dados: any): DadosFiscais {
      switch (pais) {
        case 'BR':
          return new DadosFiscaisBR(dados);
        // case 'US':
        //   return new DadosFiscaisEUA(
        //     dados.ein,
        //     dados.stateTaxId,
        //     dados.salesTaxExempt
        //   );
        default:
          throw new Error(`País não suportado: ${pais}`);
      }
    }
  }