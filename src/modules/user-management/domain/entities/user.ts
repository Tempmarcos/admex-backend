import { z } from "zod";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { InvalidNameError } from "../../../shared/errors/user/invalidNameError";
import { CreatePerfilInputDTO } from "../../dtos/perfil/CreatePerfilInputDTO";


const NomeSchema= z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
.regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais")

export class User{

    private userProps: CreateUserInputDTO;

    get nome (): string{
        return this.userProps.nome;
    }

    get admin () : boolean{
        return this.userProps.admin;
    }
    
    get email (): string {
        return this.userProps.email;
      }

    get senha (): string {
        return this.userProps.senha;
      }

    get permissoes (): string[] {
        return this.userProps.permissoes;
      }

    get perfil (): CreatePerfilInputDTO {
        return this.userProps.perfil
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
        const { nome, email, senha, permissoes, perfil, admin} = props
        return new User(props);
    }
}

