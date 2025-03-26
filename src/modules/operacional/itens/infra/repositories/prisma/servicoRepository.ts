import { PrismaClient } from "@prisma/client";
import { ItemRepository } from "../interfaceDB/itemRepository";
import { itemDTO } from "../../../dtos/itemDTO";
import { ServicoNotExistsError } from "../../../../../shared/errors/item/servicoNotExistsError";

const prisma = new PrismaClient();

export class ServicoRepository implements ItemRepository {
    async update(data: itemDTO, id: string): Promise<any | null> {
        try{
            const{nome, tipo, descricao, preco, duracao} = data;
            const servico = await prisma.servico.update({
                where: {
                    id,
                },
                data: {
                    nome, tipo, descricao, preco, duracao
                }
            })
            return servico
        }catch (error){
            console.log(error)
            return null
        }
    }
    findById(id: string): Promise<any | null> {
        return prisma.servico.findUnique({ where: { id } })
    }
    async create(data: itemDTO, empresaId: string): Promise<any | null> {
        try{
            const{nome, tipo, descricao, preco, duracao} = data;
            const servico = await prisma.servico.create({
                data: {
                    nome, tipo, descricao, preco, duracao,
                    empresaId: empresaId
                }
            })
            return servico
        }catch (error){
            console.log(error)
            return null
        }
    }
    async list(empresaId: string): Promise<any | null> {
        return await prisma.servico.findMany({
            where: { empresaId },
            select: {
                id: true, nome: true
             }
         });
    }
    delete(id: string): Promise<any | null> {
        return prisma.servico.delete({ where: { id } });
    }
    async get(id: string): Promise<any | null> {
        try {
            const servico = await prisma.servico.findUnique({
                        where: {
                            id,
                        },
                      select: {
                         id: true,
                         nome: true,
                         empresaId: true,
                         preco: true,
                         duracao: true,
                         tipo: true
                       },
                     })
              
                     if (!servico) throw new ServicoNotExistsError
              
                     return servico
              
                   } catch (error) {
                     throw new Error()
                   }         
    }
    
}