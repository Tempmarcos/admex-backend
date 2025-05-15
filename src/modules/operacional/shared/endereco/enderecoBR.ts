import { EnderecoBrDTO, enderecoBRSchema } from "../dto/endereco/enderecoBrDTO";
import { Endereco } from "./endereco";

export class EnderecoBR extends Endereco {
    public estado!: string;
    constructor(props: EnderecoBrDTO) {
        super(props.pais, props.logradouro, props.cidade, props.codigoPostal, props.numero, props.complemento,);
        this.estado = props.estado
    }

    validar(data: any): any {
        try{
            enderecoBRSchema.parse(data)
        }catch(error){
            throw error
        }
        // console.log("Endereço validado para BR")
    }
    formatar(): string {
        throw new Error("Method not implemented.");
    }
    
}