import { PrismaClient } from "@prisma/client";
import { EntidadeTerceiraRepository } from "../interfaceDB/EntidadeTerceiraRepository";
import { entidadeTerceiraDTO } from "../../../dtos/entidadeTerceiraDTO";
import { FornecedorNotExistsError } from "../../../../../shared/errors/entidades/fornecedor/fornecedorNotExistsError";



const prisma = new PrismaClient();

export class FornecedorRepository implements EntidadeTerceiraRepository {
    findById(id: string): Promise<any | null> {
        return prisma.fornecedor.findUnique({ where: { id } });
    }
    findByRegistro(registro: string): Promise<any | null> {
        return prisma.fornecedor.findFirst({ where: { registro }});
    }
    async list(empresaId: string): Promise<any | null> {
         return await prisma.fornecedor.findMany({
                where: { empresaId },
                    select: {
                        id: true, nome: true
                     }
                 });
    }
    async get(id: string): Promise<any | null> {
        try {
            const fornecedor = await prisma.fornecedor.findUnique({
                        where: {
                            id,
                        },
                      select: {
                         id: true,
                         nome: true,
                         empresaId: true,
                         contato:{
                            select:{
                                nome: true,
                                cargo: true,
                                email: true,
                                telefone: true
                            }
                         },
                         endereco: {
                            select:{
                                pais: true,
                                dados: true
                            }
                         },
                         registro: true,
                       },
                     })
              
                     if (!fornecedor) throw new FornecedorNotExistsError()
              
                     return fornecedor
              
                   } catch (error) {
                     throw new Error()
                   }         
    }
    async update(data: entidadeTerceiraDTO, id: string): Promise<any | null> {
        try{
            const{nome, contato, registro, endereco} = data;
            const fornecedor = await prisma.fornecedor.update({
                where: {
                    id,
                },
                data:{
                    nome, contato:{
                        update:{
                            nome: contato.nome,
                            cargo: contato.cargo,
                            telefone: contato.telefone,
                            email: contato.email
                        }
                    },
                    endereco: {
                        update:{
                            pais: endereco.pais,
                            dados: endereco
                        }
                    }
                }
            })
            return fornecedor
        }catch (error){
            console.log(error)
            return null
        }
    }
    async create(data: entidadeTerceiraDTO, empresaId: string): Promise<any | null> {
        try{
            const{nome, contato, registro, endereco} = data;
            const fornecedor = await prisma.fornecedor.create({
                data:{
                    nome, contato:{
                        create:{
                            nome: contato.nome,
                            cargo: contato.cargo,
                            telefone: contato.telefone,
                            email: contato.email
                        }
                    },
                    registro,
                    endereco: {
                        create:{
                            pais: endereco.pais,
                            dados: endereco
                        }
                    },
                    empresaId: empresaId
                }
            })
            return fornecedor
        }catch (error){
            console.log(error)
            return null
        }
    }
    delete(id: string): Promise<any | null> {
        return prisma.fornecedor.delete({ where: { id } });
    }
    
}