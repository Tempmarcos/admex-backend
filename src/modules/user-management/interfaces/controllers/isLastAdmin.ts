import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";

export async function isLastAdmin(userId: string, userRepository: UserRepository): Promise<boolean> {
  const totalAdmins = await userRepository.countAdmins();
  if (totalAdmins > 1) return false;

  const user = await userRepository.findById(userId);
  return user?.admin === true;
}