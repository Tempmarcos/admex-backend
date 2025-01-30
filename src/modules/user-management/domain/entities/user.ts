import { z } from "zod";
import { Email } from "../../../shared/value-objects/email/email";
import { Permissoes } from "../value-objects/permissoes/permissoes";
import { Perfil } from "../value-objects/perfil/perfil";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { InvalidNameError } from "../../../shared/errors/user/invalidNameError";


const NomeSchema= z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
.regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais")

export class User{

    private userProps: CreateUserInputDTO;

    get nome (): string{
        return this.nome;
    }
    
    get email (): Email {
        return this.email;
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

