import { test, expect } from 'vitest'
import { Perfil } from './perfil';
import { InvalidPerfilError } from '../../../../shared/errors/perfil/invalidPerfilError';


test('Criar perfil válido', () => {
    const profile = {foto: '010101101110101101', nomeDeUsuario: 'Tempmarcos',
        tema: 'floral', fonte: '14'}
    expect(Perfil.validate(profile)).toReturn
})

test('Criar perfil com tema inválido', () => {
    const profile = {foto: '010101101110101101', nomeDeUsuario: 'Tempmarcos',
        tema: 'floral2', fonte: '14'};
    expect(() => Perfil.validate(profile)).toThrow(InvalidPerfilError)
})

test('Criar perfil com fonte inválida', () => {
    const profile = {foto: '010101101110101101', nomeDeUsuario: 'Tempmarcos',
        tema: 'floral', fonte: '14c'};
    expect(() => Perfil.validate(profile)).toThrow(InvalidPerfilError)
})

test('Criar perfil com nome inválido', () => {
    const profile = {foto: '010101101110101101', nomeDeUsuario: 'oi',
        tema: 'floral', fonte: '14'};
    expect(() => Perfil.validate(profile)).toThrow(InvalidPerfilError)
})
