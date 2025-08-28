import { z } from "zod"
import { InvalidPermissoesError } from "../../../../shared/errors/permissoes/invalidPermissoesError";

enum permissions  {
    VerUsuarios = 'verUsuarios',        //Permissão para listar usuários da empresa
    CriarUsuarios = 'criarUsuarios',    //Permissão para criar usuários
    DeletarUsuarios = 'deletarUsuarios',//Permissão para deletar usuários
    EditarUsuarios ='editarUsuarios',  //Permissão para editar usuários
    VerInfoUsuario = 'verInfoUsuario',  //Permissão para dar get em um usuário

    //EMPRESA
    VerDados = 'verDados', //Permissão para ver os dados da empresa
    EditarDados = 'editarDados',

    //ITENS
    VerItens = 'verItens',               //Permissão para ver os itens da empresa
    AdicionarItens = 'adicionarItens',   //Permissão para adicionar itens na empresa
    EditarItens = 'editarItens',         //Permissão para editar os itens da empresa
    DeletarItens = 'deletarItens'  ,      //Permissão para deletar os itens da empresa

    //ENTIDADES
    VerEntidades = 'verEntidades',             //Permissão para ver as entidades da empresa
    AdicionarEntidades = 'adicionarEntidades', //Permissão para adicionar entidades na empresa
    EditarEntidades = 'editarEntidades',       //Permissão para editar as entidades da empresa
    DeletarEntidades = 'deletarEntidades' ,     //Permissão para deletar as entidades da empresa

    //TAREFAS
    CriarTarefas = 'criarTarefas',

    //PROPOSTAS
    VerPropostas = 'verPropostas',
    DeletarPropostas = 'deletarPropostas',
    CriarPropostas = 'criarPropostas'
}

const permissionEnum = z.nativeEnum(permissions)

export const permissionSchema= z.array(permissionEnum)

export class Permissoes {
    static giveAllPermissoes(userPermissions : string[]){
        userPermissions.length = 0; 
        userPermissions.push(
            'verUsuarios', 'criarUsuarios', 'deletarUsuarios', 'editarUsuarios', 
            'verInfoUsuario', 'verDados', 'editarDados', 'verItens', 'adicionarItens', 'editarItens',
            'deletarItens', 'verEntidades', 'adicionarEntidades', 'editarEntidades',
            'deletarEntidades', 'criarTarefas', 'verPropostas', 'deletarPropostas', 'criarPropostas');
    }

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