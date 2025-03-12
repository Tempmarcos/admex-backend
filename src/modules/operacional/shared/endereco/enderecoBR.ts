import { EnderecoBrDTO } from "../dto/endereco/enderecoBrDTO";
import { Endereco } from "./endereco";

export class EnderecoBR extends Endereco {

    constructor(props: EnderecoBrDTO) {
        super(props.pais, props.logradouro, props.cidade, props.codigoPostal);
      }

    validar(): any {
        // throw new Error("Method not implemented.");
        console.log("Endereço validado para BR")
    }
    formatar(): string {
        throw new Error("Method not implemented.");
    }
    
}