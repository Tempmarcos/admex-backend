import { UserNotExistsError } from "../../../shared/errors/user/userNotExistsError";
import { GetUserDTO } from "../../dtos/user/GetUserDTO";
import { UserRepository } from "../../infra/repositories/interfaceDB/UserRepository";





export class GetUserUseCase {
    constructor(private userRepository: UserRepository){}

    async execute(id: string): Promise<GetUserDTO | null> {
        // console.log(id)
        const userExist = this.userRepository.findById(id);
        if(!userExist){
            throw new UserNotExistsError();
        }
        return this.userRepository.get(id)
        }
    }