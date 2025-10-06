import { CreateDadosFinanceirosDTO } from "../../../dtos/createDadosFinanceirosDTO";

export class DadosFinanceiros {
    private dadosFinanceirosProps: CreateDadosFinanceirosDTO;
    
    get banco(): string | undefined{
        return this.dadosFinanceirosProps.banco;
    }

    get conta(): string | undefined{
        return this.dadosFinanceirosProps.conta;
    }
    get agencia(): string | undefined{
        return this.dadosFinanceirosProps.agencia;
    }
    get pix(): string | undefined{
        return this.dadosFinanceirosProps.pix;
    }

    private constructor(props: CreateDadosFinanceirosDTO){
            this.dadosFinanceirosProps = props;
        }

    public static async create (props: CreateDadosFinanceirosDTO) : Promise<DadosFinanceiros> {
            const {banco, agencia, conta, pix} = props
            return new DadosFinanceiros(props);
        }
}