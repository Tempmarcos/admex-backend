import { Email } from "../../../shared/value-objects/email/email";
import { Permissoes } from "../value-objects/permissoes";
import { Profile } from "../value-objects/profile";
import { Senha } from "../value-objects/senha";

interface UserProps {
    nome: string;
    email: Email;
    senha: Senha;
    permissoes: Permissoes;
    perfil: Profile;
}

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

    public static create (props: UserProps): any {

    }
}

