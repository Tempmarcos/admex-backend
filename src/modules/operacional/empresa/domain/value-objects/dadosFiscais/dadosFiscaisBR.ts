import { DadosFiscaisBrDTO } from "../../../dtos/DadosFiscais/DadosFiscaisBrDTO";
import { DadosFiscais } from "./dadosFiscais";

export class DadosFiscaisBR extends DadosFiscais {
    constructor(
        props: DadosFiscaisBrDTO
    ){
        super(props.registro, props.classificacao);
    }

    validarRegistro(registro: string): any {
        // throw new Error("Method not implemented.");
        console.log("Validar cpnj " + registro)
        //função para validar o cnpj
    }
}