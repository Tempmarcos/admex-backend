import { z } from "zod";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { InvalidNameError } from "../../../shared/errors/user/invalidNameError";
import { CreatePerfilInputDTO } from "../../dtos/perfil/CreatePerfilInputDTO";


const NomeSchema= z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
.regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais")

export class User{

    private userProps: CreateUserInputDTO;

    get nome (): string{
        return this.nome;
    }
    
    get email (): string {
        return this.email;
      }

    get senha (): string {
        return this.senha;
      }

    get permissoes (): string[] {
        return this.permissoes;
      }

    get perfil (): CreatePerfilInputDTO {
        return this.perfil
      }
    
    private constructor(props: CreateUserInputDTO){
        this.userProps = props;
    }

    static nomeValidate(nome : string){
        try{
            NomeSchema.parse(nome);
        }catch(error){
            throw new InvalidNameError();
        }
            return nome;
    }
    
    public static async create (props: CreateUserInputDTO) : Promise<User> {
        const { nome, email, senha, permissoes, perfil} = props
        return new User(props);
    }
}

