import { expect, test } from 'vitest'
import { User } from './user';
import { InvalidNameError } from '../../../shared/errors/user/invalidNameError';

test('Nome de usuário correto', () => {
    const nome = User.nomeValidate('João Pereira da Silva');
    expect(nome).toBeTypeOf('string');
    expect(nome).toBe('João Pereira da Silva')
 });

 test('Nome de usuário muito curto', () => {
     expect(() => User.nomeValidate("oi")).toThrow(InvalidNameError);
 });

 test('Nome de usuário muito longo', () => {
    expect(() => 
        User.nomeValidate("Teste de nome muito muito muito longo realmente longo demais ninguém tem um nome tão longo assim"))
    .toThrow(InvalidNameError);
});

test('Nome de usuário inválido', () => {
    expect(() => User.nomeValidate("123_Marcos_123")).toThrow(InvalidNameError);
});