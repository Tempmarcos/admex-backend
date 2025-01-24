import { test, expect } from 'vitest'
import { Senha } from './senha'
import { InvalidSenhaError } from '../../../../shared/errors/senha/invalidSenhaError';


test('Criar uma senha válida', () => {
    const senha = Senha.validate('senha123');
    expect(senha).toBeTypeOf('string');
    expect(senha).toBe('senha123');
})

test('Criar um email inválido', () => {
    expect(() => Senha.validate("oi")).toThrow(InvalidSenhaError);
})