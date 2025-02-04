import { z } from "zod"
import { InvalidPermissoesError } from "../../../../shared/errors/permissoes/invalidPermissoesError";

enum permissions  {
    VerUsuarios = 'verUsuarios',        //Permissão para listar usuários da empresa
    CriarUsuarios = 'criarUsuarios',    //Permissão para criar usuários
    DeletarUsuarios = 'deletarUsuarios',//Permissão para deletar usuários
    EditarUsuarios ='editarUsuarios',  //Permissão para editar usuários
}

const permissionEnum = z.nativeEnum(permissions)

export const permissionSchema= z.array(permissionEnum)

export class Permissoes {
    static comparePermissions(permissions : string[], userPermissions : string[]){
       if(permissions.every(permissao => userPermissions.includes(permissao))){
        return true
       } else {
        return false
       }
    }

    static validatePermissions(permissions : string[]){
        try{
            permissionSchema.parse(permissions);
        }catch(error){
            throw new InvalidPermissoesError();
        }
        return permissions;
    } 

    static mudarPermissoes(permissions : string[], userPermissions : string[]){
        try{
            Permissoes.validatePermissions(permissions);
        }catch(error){
            throw new InvalidPermissoesError();

        }
        return userPermissions = permissions;
    }
}

// Usuários:
// -Ver usuários
// -Criar usuário
// -Deletar usuário
// -Editar usuário

// Empresa:
// -Ver dados gerais
// -Editar dados gerais
// -Ver dados financeiros
// -Editar dados financeiros
// -Ver dados fiscais
// -Editar dados fiscais