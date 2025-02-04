import { UserNotExistsError } from "../../../shared/errors/user/userNotExistsError";
import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";


export class DeleteUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(userId: string): Promise<void>{
        const userExists = await this.userRepository.findById(userId)

        if(!userExists) {
            throw new UserNotExistsError();
        }

        await this.userRepository.delete(userId)
    }
}