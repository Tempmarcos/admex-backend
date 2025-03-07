import { DadosFiscaisBrDTO } from "../../../dtos/DadosFiscais/DadosFiscaisBrDTO";
import { DadosFiscais } from "./dadosFiscais";

export class DadosFiscaisBR extends DadosFiscais {
    constructor(
        props: DadosFiscaisBrDTO
    ){
        super(props.registro, props.classificacao);
    }

    validarRegistro(registro: string): boolean {
        throw new Error("Method not implemented.");
        //função para validar o cnpj
    }
}