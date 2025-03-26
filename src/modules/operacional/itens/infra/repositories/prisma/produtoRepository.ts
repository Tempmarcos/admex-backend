import { PrismaClient } from "@prisma/client";
import { itemDTO } from "../../../dtos/itemDTO";
import { ItemRepository } from "../interfaceDB/itemRepository";
import { ProdutoNotExistsError } from "../../../../../shared/errors/item/produtoNotExistsError";

const prisma = new PrismaClient();

export class ServicoRepository implements ItemRepository {
    async update(data: itemDTO, id: string): Promise<any | null> {
        try{
            const{nome, tipo, descricao, preco, estoque, unidadeMedida} = data;
            const produto = await prisma.produto.update({
                where: {
                    id,
                },
                data: {
                    nome, tipo, descricao, preco, estoque, unidadeMedida
                }
            })
            return produto
        }catch (error){
            console.log(error)
            return null
        }
    }
    findById(id: string): Promise<any | null> {
        return prisma.produto.findUnique({ where: { id } })
    }
    async create(data: itemDTO, empresaId: string): Promise<any | null> {
        try{
            const{nome, tipo, descricao, preco, estoque, unidadeMedida} = data;
            const produto = await prisma.produto.create({
                data: {
                    nome, tipo, descricao, preco, estoque, unidadeMedida,
                    empresaId: empresaId
                }
            })
            return produto
        }catch (error){
            console.log(error)
            return null
        }
    }
    async list(empresaId: string): Promise<any | null> {
        return await prisma.produto.findMany({
            where: { empresaId },
            select: {
                id: true, nome: true
             }
         });
    }
    delete(id: string): Promise<any | null> {
        return prisma.produto.delete({ where: { id } });
    }
    async get(id: string): Promise<any | null> {
        try {
            const produto = await prisma.produto.findUnique({
                        where: {
                            id,
                        },
                      select: {
                         id: true,
                         nome: true,
                         empresaId: true,
                         preco: true,
                         estoque: true,
                         unidadeMedida: true,
                         tipo: true
                       },
                     })
              
                     if (!produto) throw new ProdutoNotExistsError
              
                     return produto
              
                   } catch (error) {
                     throw new Error()
                   }         
    }
    
}