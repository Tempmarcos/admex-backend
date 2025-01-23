import { test, expect } from 'vitest'
import { Email } from './email'
import { ZodError } from 'zod'


test('Criar um email válido', () => {
    const email = Email.validate('balbaskvbxa@gmail.com');
    expect(email).toBeInstanceOf(Email);
    expect(email.getValue()).toBe("balbaskvbxa@gmail.com");
})

test('Criar um email inválido', () => {
    expect(() => Email.validate("balbaskvbxa")).toThrow("Email inválido");
})