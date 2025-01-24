import { test, expect } from 'vitest'
import { Email } from './email'
import { EmailInvalidError } from '../../errors/email/emailInvalidError';


test('Criar um email válido', () => {
    const email = Email.validate('balbaskvbxa@gmail.com');
    expect(email).toBeTypeOf('string');
    expect(email).toBe("balbaskvbxa@gmail.com");
})

test('Criar um email inválido', () => {
    expect(() => Email.validate("balbaskvbxa")).toThrow(EmailInvalidError);
})