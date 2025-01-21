import { z } from "zod";
import { Email } from "../../../shared/value-objects/email/email";
import { Permissoes } from "../value-objects/permissoes";
import { Profile } from "../value-objects/profile";
import { Senha } from "../value-objects/senha";


interface UserProps {
    nome: string;
    email: string;
    senha: string;
    permissoes: string[];
    perfil: string;
}

const NomeSchema= z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
.regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais")

export class User{

    private userProps: UserProps;

    get nome (): string{
        return this.nome;
    }
    
    get email (): Email {
        return this.email;
      }
    

    private constructor(props: UserProps){
        this.userProps = props;
    }

    public static create (props: UserProps) {
        const { nome, email, senha, permissoes, perfil} = props
        NomeSchema.parse(nome);
        Email.create(email);
        Senha.create(senha)
    }
}

