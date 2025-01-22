import bcrypt from "bcrypt";

export class PasswordHasher {
  private static SALT_ROUNDS = 10;

  static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, PasswordHasher.SALT_ROUNDS);
  }

  static async compare(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }
}