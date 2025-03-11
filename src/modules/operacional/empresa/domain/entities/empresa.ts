import { z } from "zod";
import { CreateEmpresaDTO } from "../../dtos/CreateEmpresaDTO";


export class Empresa{

    private empresaProps: CreateEmpresaDTO;

    private constructor(props: CreateEmpresaDTO){
            this.empresaProps = props;
        }

    public static async create (props: CreateEmpresaDTO) : Promise<Empresa> {
            const { DadosFiscais, DadosGerais, DadosFinanceiros} = props
            return new Empresa(props);
        }
}