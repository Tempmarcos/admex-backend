import { PrismaClient, User } from "@prisma/client";
import { CreateUserInputDTO } from "../../../dtos/user/CreateUserInputDTO";
import { UserRepository } from "../interfaceDB/UserRepository";
import { UpdateUserInputDTO } from "../../../dtos/user/UpdateUserInputDTO";
import { ListUserDTO } from "../../../dtos/user/ListUserDTO";
import { UserNotExistsError } from "../../../../shared/errors/user/userNotExistsError";
import { GetUserDTO } from "../../../dtos/user/GetUserDTO";
import { UpdatePerfilInputDTO } from "../../../dtos/perfil/UpdatePerfilInputDTO";
import { UpdateEmailDTO } from "../../../dtos/user/UpdateEmailDTO";
import { UpdateSenhaDTO } from "../../../dtos/user/UpdateSenhaDTO";

const prisma = new PrismaClient();

export class PrismaUserRepository implements UserRepository {
    async updatePerfil(data: UpdatePerfilInputDTO, id: string): Promise<User | null> {
        const {foto, nomeDeUsuario, tema, fonte} = data;
        try {
            const user = prisma.user.update({
                where: {
                    id,
                },
                data: { 
                    perfil: {
                        update: {
                            foto, nomeDeUsuario, tema
                        }
                    }
                },
            })
            return user
        }catch(err){
            console.log(err)
            return null
        }
    }
    async updateSenha(senha: string, id: string): Promise<User | null> {
        try {
            const user = prisma.user.update({
                where: {
                    id,
                },
                data: {
                    senha
                },
            })
            return user
        } catch (err){
            console.log(err)
            return null
        }     
    }
    async updateEmail(id: string, email: string): Promise<User | null> {
        try {
            const user = prisma.user.update({
                where: {
                    id,
                },
                data: {
                    email
                },
            })
            return user
        } catch (err){
            console.log(err)
            return null
        }     
    }
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

    async findByEmail(email: string): Promise<User | any> {
        return prisma.user.findUnique({ where: { email }, 
            select:{
            id: true,
            nome: true,
            senha: true,
            perfil: {
                select: {
                    nomeDeUsuario: true,
                    foto: true,
                    tema: true
                }
            },
            permissoes: true,
            email: true,
            created_at: true,
            updatedAt: true,
        } 
    });
    }

    async create(data: CreateUserInputDTO, empresaId: string): Promise<User | null> {
         try{
            const {nome, email, senha, permissoes, perfil, admin} = data;
             const user = await prisma.user.create({
                data: {
                    nome, email, senha, permissoes, admin,
                    perfil: {
                        create:
                            {nomeDeUsuario: perfil.nomeDeUsuario, 
                            tema: perfil.tema, foto: perfil.foto}
                    },
                    empresaId: empresaId
                }
            })
            return user
        }catch (error){
            console.log(error)
            return null
        }
    }

    async get(id: string): Promise<GetUserDTO | null>{
        try {
            const user = await prisma.user.findUnique({
              where: {
                id,
              },
              select: {
                id: true,
                empresaId: true,
                nome: true,
                admin: true,
                email: true,
                permissoes: true,
                created_at: true,
                updatedAt: true,
                perfil: true
              },
            })
      
            if (!user) throw new UserNotExistsError
      
            return user
      
          } catch (error) {
            throw new Error()
          }
    }

    async list(empresaId: string): Promise<ListUserDTO[]> {
        return await prisma.user.findMany({
            where: { empresaId },
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