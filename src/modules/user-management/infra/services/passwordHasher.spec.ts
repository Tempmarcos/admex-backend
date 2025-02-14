import { expect, test } from "vitest";
import { PasswordHasher } from "./passwordHasher";

test('Senha hasheada', async () => {
    const senha = await PasswordHasher.hash('senha123');
    expect(senha).toBeTypeOf('string');
    expect(senha).not.toBe('senha123');
    expect(await PasswordHasher.compare(senha, 'senha123') == true)
})