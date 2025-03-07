import { EnderecoBrDTO } from "../dto/endereco/enderecoBrDTO";
import { Endereco } from "./endereco";

export class EnderecoBR extends Endereco {

    constructor(props: EnderecoBrDTO) {
        super(props.pais, props.logradouro, props.cidade, props.codigoPostal);
      }

    validar(): boolean {
        throw new Error("Method not implemented.");
    }
    formatar(): string {
        throw new Error("Method not implemented.");
    }
    
}