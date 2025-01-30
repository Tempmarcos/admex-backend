import { PrismaClient, User } from "@prisma/client";
import { CreateUserInputDTO } from "../../../dtos/user/CreateUserInputDTO";
import { ListUserDTO } from "../../../dtos/user/ListUserDTO";
import { UserRepository } from "../interfaceDB/UserRepository";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
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
                //  data: {
                //      nome: data.nome,
                //      email: data.email,
                //      senha: data.senha,
                //      permissoes: data.permissoes,
                //      perfil:{
                //         foto: data.perfil.foto,
                //         nomeDeUsuario: data.perfil.nomeDeUsuario,
                //         fonte: data.perfil.fonte,
                //         tema: data.perfil.tema
                //      }
                //   } 
                data: {
                    nome, email, senha, permissoes,
                    perfil: {
                        create:
                            {fonte: perfil.fonte, nomeDeUsuario: perfil.nomeDeUsuario, tema: perfil.tema, foto: perfil.foto}

                        
                    }
                }
            })
            return user
        }catch (error){
            console.log(error)
            return null
        }
    }
    async list(): Promise<ListUserDTO[]> {
        return prisma.user.findMany();
    }
    async delete(id: string): Promise<User | null> {
        return prisma.user.delete({ where: { id } });
    }
    
}