import { test, expect} from "vitest";
import { Permissoes } from "./permissoes";
import { InvalidPermissoesError } from "../../../../shared/errors/permissoes/invalidPermissoesError";


test('Criar permissões válidas', () => {
    const userPermissions = ['verUsuarios']
    const permissoes = ['verUsuarios', 'criarUsuarios', 'deletarUsuarios', 'editarUsuarios']
    expect(() => Permissoes.mudarPermissoes(permissoes, userPermissions)).toReturn;
    // expect(permissoes).equals(userPermissions)
}) 


test('Criar permissões inválidas', () => {
    const userPermissions = ['verUsuarios']
    const permissoes = ['verOsUsuarios', 'criarDoisUsuarios', 'deletarTudo', 'editarUsuarios']
    expect(() => Permissoes.mudarPermissoes(permissoes, userPermissions)).toThrow(InvalidPermissoesError);
}) 