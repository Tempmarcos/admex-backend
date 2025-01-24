import { z } from "zod"

enum permissions  {
    'verUsuarios',            //Permissão para ver a listagem de usuários da empresa
    'criarUsuarios',          //Permissão para criar usuários
    'deletarUsuarios',        //Permissão para deletar usuários
    'editarUsuários',         //Permissão para editar usuários
}

const permissionSchema = z.nativeEnum(permissions)

export class Permissoes {
    static comparePermissions(permissions : string[], userPermissions : string[]){
       if(permissions.every(permissao => userPermissions.includes(permissao))){
        return true
       } else {
        return false
       }
    }

    adicionarPermissao(permissions : string[], userPermissions : string[]){
        Permissoes.comparePermissions(permissions, userPermissions) == true ?
        userPermissions.concat(permissions) : console.log('Erro')
    }

    removerPermissao(permissions : string[], userPermissions : string[]){
        // Permissoes.comparePermissions(permissions, userPermissions) == true ?
        // userPermissions.filter(permissions) : console.log('Erro')
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