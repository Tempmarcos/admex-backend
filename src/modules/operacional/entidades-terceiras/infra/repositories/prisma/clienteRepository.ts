import { PrismaClient } from "@prisma/client";
import { EntidadeTerceiraRepository } from "../interfaceDB/EntidadeTerceiraRepository";
import { entidadeTerceiraDTO } from "../../../dtos/entidadeTerceiraDTO";
import { ClienteNotExistsError } from "../../../../../shared/errors/entidades/cliente/clienteNotExistsError";



const prisma = new PrismaClient();

export class ClienteRepository implements EntidadeTerceiraRepository {
    findById(id: string): Promise<any | null> {
        return prisma.cliente.findUnique({ where: { id } });
    }
    findByRegistro(registro: string): Promise<any | null> {
        return prisma.cliente.findFirst({ where: { registro }});
    }
    async list(empresaId : string): Promise<any | null> {
         return await prisma.cliente.findMany({
                    where: { empresaId },
                    select: {
                        id: true, nome: true
                     }
                 });
    }
    async get(id: string): Promise<any | null> {
        try {
            const cliente = await prisma.cliente.findUnique({
                        where: {
                            id,
                        },
                      select: {
                         id: true,
                         nome: true,
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
              
                     if (!cliente) throw new ClienteNotExistsError

                     return cliente
              
                   } catch (error) {
                     throw new Error()
                   }         
    }
    async update(data: entidadeTerceiraDTO, id: string): Promise<any | null> {
        try{
            const{nome, contato, endereco, registro} = data;
            const { pais, ...dadosSemPais } = endereco;
            const cliente = await prisma.cliente.update({
                where: {
                    id,
                },
                data:{
                    nome, registro, contato:{
                        update:{
                            nome: contato.nome,
                            cargo: contato.cargo,
                            telefone: contato.telefone,
                            email: contato.email
                        }
                    },
                    endereco: {
                        update:{
                            pais: pais,
                            dados: dadosSemPais
                        }
                    }
                }
            })
            return cliente
        }catch (error){
            console.log(error)
            return null
        }
    }
    async create(data: entidadeTerceiraDTO, empresaId: string): Promise<any | null> {
        try{
            const{nome, contato, registro, endereco} = data;
            const { pais, ...dadosSemPais } = endereco;
            const cliente = await prisma.cliente.create({
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
                            pais: pais,
                            dados: dadosSemPais
                        }
                    },
                    empresaId: empresaId
                }
            })
            return cliente
        }catch (error){
            console.log(error)
            return null
        }
    }
    delete(id: string): Promise<any | null> {
        return prisma.cliente.delete({ where: { id } });
    }
    
}