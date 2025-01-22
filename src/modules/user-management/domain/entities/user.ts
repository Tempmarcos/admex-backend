import { z } from "zod";
import { Email } from "../../../shared/value-objects/email/email";
import { Permissoes } from "../value-objects/permissoes";
import { Perfil } from "../value-objects/perfil";
import { Senha } from "../value-objects/senha";
import { CreateUserInputDTO } from "../../dtos/user/CreateUserInputDTO";
import { PasswordHasher } from "../services/passwordHasher";


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


    //MOVER PARA USE CASE
    public static async create (props: CreateUserInputDTO) {
        const { nome, email, senha, permissoes, perfil} = props
        NomeSchema.parse(nome);
        Email.create(email);
        Senha.validate(senha)
        const senhaHash = await PasswordHasher.hash(senha)
        Senha.create(senhaHash)
    }
}

