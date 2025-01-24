import bcrypt from "bcrypt";

export class PasswordHasher {
  private static SALT_ROUNDS = 10;

  static async hash(senha: string): Promise<string> {
    return await bcrypt.hash(senha, PasswordHasher.SALT_ROUNDS);
  }

  static async compare(senha: string, senhaHash: string): Promise<boolean> {
    return await bcrypt.compare(senha, senhaHash);
  }
}