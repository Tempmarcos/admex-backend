import { CreateDadosFinanceirosDTO } from "../../../dtos/createDadosFinanceirosDTO";

export class DadosFinanceiros {
    private dadosFinanceirosProps: CreateDadosFinanceirosDTO;
    
    get contaBancaria(): string{
        return this.dadosFinanceirosProps.contaBancaria;
    }

    private constructor(props: CreateDadosFinanceirosDTO){
            this.dadosFinanceirosProps = props;
        }

    public static async create (props: CreateDadosFinanceirosDTO) : Promise<DadosFinanceiros> {
            const {contaBancaria} = props
            return new DadosFinanceiros(props);
        }
}