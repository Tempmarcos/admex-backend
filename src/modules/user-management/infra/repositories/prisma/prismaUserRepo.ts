import { PrismaClient, User } from "@prisma/client";
import { CreateUserInputDTO } from "../../../dtos/user/CreateUserInputDTO";
import { UserRepository } from "../interfaceDB/UserRepository";
import { UpdateUserInputDTO } from "../../../dtos/user/UpdateUserInputDTO";
import { ListUserDTO } from "../../../dtos/user/ListUserDTO";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
    static findById: any;
    async update(data: UpdateUserInputDTO, id: string): Promise<User | null> {
        const {nome, permissoes} = data;
        try {
            const user = prisma.user.update({
                where: {
                    id,
                },
                data: {
                    nome, permissoes,
                },
            })

            return user
        } catch (err){
            console.log(err)
            return null
        }     
    }

    async findById(id: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { id } });
    }

    async findByEmail(email: string): Promise<User | null> {
        return prisma.user.findUnique({ where: { email } });
    }

    async create(data: CreateUserInputDTO): Promise<User | null> {
         try{
            const {nome, email, senha, permissoes, perfil} = data;
             const user = await prisma.user.create({
                data: {
                    nome, email, senha, permissoes,
                    perfil: {
                        create:
                            {fonte: perfil.fonte, 
                            nomeDeUsuario: perfil.nomeDeUsuario, 
                            tema: perfil.tema, foto: perfil.foto}
                    }
                }
            })
            return user
        }catch (error){
            console.log(error)
            return null
        }
    }

    async list(empresaId: string): Promise<ListUserDTO[]> {
        return await prisma.user.findMany({
            // where: empresaId 
            select: {
                id: true,
                nome: true,
            }
        });
    }
    
    async delete(id: string): Promise<User | null> {
        return prisma.user.delete({ where: { id } });
    }
    
}