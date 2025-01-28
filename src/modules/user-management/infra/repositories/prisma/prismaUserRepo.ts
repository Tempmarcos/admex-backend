import { PrismaClient, User } from "@prisma/client";
import { CreateUserInputDTO } from "../../../dtos/user/CreateUserInputDTO";
import { ListUserDTO } from "../../../dtos/user/ListUserDTO";
import { UserRepository } from "../UserRepository";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
    async findById(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async findByEmail(email: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    async create(data: CreateUserInputDTO): Promise<User | null> {
         try{
             const user = await prisma.user.create({
                 data:{
                    id: 'oi',
                    name: data.nome,
                    email: data.email,
                    senha: data.senha,
                 } 
            })
            return user
        }catch (error){
            console.log(error)
            return null
        }
    }
    async list(): Promise<ListUserDTO[]> {
        throw new Error("Method not implemented.");
    }
    async delete(id: string): Promise<User | null> {
        throw new Error("Method not implemented.");
    }
    
}