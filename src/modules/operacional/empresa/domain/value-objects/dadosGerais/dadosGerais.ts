import { CreateDadosGeraisDTO } from "../../../dtos/createDadosGeraisDTO";


export class DadosGerais {
    private dadosGeraisProps: CreateDadosGeraisDTO;
    
    get nome(): string{
        return this.dadosGeraisProps.nome;
    }

    get dataDeFundacao(): string{
        return this.dadosGeraisProps.dataDeFundacao
    }

    get logo(): string | undefined{
        return this.dadosGeraisProps.logo
    }

    get endereco(): any{
        return this.dadosGeraisProps.endereco
    }

    private constructor(props: CreateDadosGeraisDTO){
            this.dadosGeraisProps = props;
        }

    public static async create (props: CreateDadosGeraisDTO) : Promise<DadosGerais> {
            const { nome, dataDeFundacao, logo, endereco} = props
            return new DadosGerais(props);
        }
}