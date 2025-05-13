import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";


export class TestarEmailUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(email: string): Promise<boolean> {
        const test = this.userRepository.verifyEmail(email)
        return test;
        }
    }