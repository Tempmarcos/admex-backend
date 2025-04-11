import { PrismaClient } from "@prisma/client";
import { PropostaRepository } from "../interfaceDB/propostaRepository";
import { VersaoPropostaDTO } from "../../../dtos/VersaoPropostaDTO";
import { PropostaDTO } from "../../../dtos/PropostaDTO";
import { PropostaUpdateDTO } from "../../../dtos/PropostaUpdateDTO";
import { PropostaNotExistsError } from "../../../../../shared/errors/proposta/propostaNotExistsError";
import { VersaoPropostaUpdateDTO } from "../../../dtos/VersaoPropostaUpdateDTO";



const prisma = new PrismaClient();

export class PrismaPropostaRepository implements PropostaRepository {
    findById(id: string): Promise<any | null> {
        return prisma.proposta.findUnique({ where: { id } })
    }
    async create(data: PropostaDTO, empresaId: string): Promise<any | null> {
        try{
            const{titulo, clienteId, status, versao, codigo, descricao} = data;
            const proposta = await prisma.proposta.create({
                data: {
                    titulo,
                    status,
                    descricao,
                    codigo,
                    versoes: {
                        create: {
                            dataProposta: versao.dataProposta,
                            numeroVersao: versao.numeroVersao,
                            valorTotal: versao.valorTotal,
                            produtos: {
                                create: versao.produto.map(prod => ({
                                    nome: prod.nome,
                                    preco: prod.preco,
                                    quantidade: prod.quantidade,
                                    unidadeDeMedida: prod.unidadeDeMedida
                                  }))  
                            },
                            servicos: {
                                create: versao.servico.map(serv => ({
                                    nome: serv.nome,
                                    preco: serv.preco,
                                  }))
                            }
                        }
                    },
                    clienteId: clienteId,
                    empresaId: empresaId
                }
            })
            return proposta
        }catch (error){
            console.log(error)
            return null
        }
    }
    async list(empresaId: string): Promise<any | null> {
        return await prisma.proposta.findMany({
            where: { empresaId },
            select: {
                id: true,
                titulo: true,
            } 
        });
    }
    delete(id: string): Promise<any | null> {
        return prisma.proposta.delete({ where: { id } });
    }
    async get(id: string): Promise<any | null> {
        try {
            const proposta = await prisma.proposta.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    empresaId: true,
                    titulo: true,
                    codigo: true,
                    descricao: true,
                    cliente: {
                        select: {
                            nome: true
                        }
                    },
                    status: true,
                    updatedAt: true,
                    createdAt: true,
                    versoes: {
                        select: {
                            id: true,
                            dataProposta: true,
                            valorTotal: true,
                            numeroVersao: true,
                            createdAt: true,
                            aprovado: true,
                            executado: true,
                            servicos: {
                                select: {
                                    id: true,
                                    nome: true,
                                    preco: true
                                }
                            },
                            produtos: {
                                select: {
                                    id: true,
                                    nome: true,
                                    preco: true,
                                    quantidade: true,
                                    unidadeDeMedida: true
                                }
                            }
                        }
                    }
                }
            })
              
            if (!proposta) throw new PropostaNotExistsError
              
            return proposta
              
            } catch (error) {
                throw new Error()
            }
    }
    async update(data: PropostaUpdateDTO, id: string): Promise<any | null> {
        try{
            const{titulo, status, codigo, descricao} = data;
            const proposta = await prisma.proposta.update({
                where: {
                    id
                },
                data: {
                    titulo,
                    status,
                    descricao,
                    codigo,
                }
            })
            return proposta
        }catch (error){
            console.log(error)
            return null
        }
    }

    async createVersao(data: VersaoPropostaDTO, propostaId: string): Promise<any | null> {
        try {
            const { dataProposta, valorTotal, numeroVersao, produto, servico } = data;
            const versao = await prisma.versaoProposta.create({
                data: {
                    dataProposta,
                    numeroVersao,
                    valorTotal,
                    produtos: {
                        create: produto.map(prod => ({
                            nome: prod.nome,
                            preco: prod.preco,
                            quantidade: prod.quantidade,
                            unidadeDeMedida: prod.unidadeDeMedida
                        }))  
                    },
                    servicos: {
                        create: servico.map(serv => ({
                            nome: serv.nome,
                            preco: serv.preco,
                        }))
                    },
                    propostaId: propostaId
                }
            })
            return versao
        } catch(error) {
            console.log(error)
            return null
        }
    }

    async updateVersao(data: VersaoPropostaUpdateDTO, versaoId: string): Promise<any | null> {
        try {
            const { dataProposta, valorTotal, produto, servico } = data;
            const versao = await prisma.versaoProposta.update({
                where:{
                    id: versaoId
                },
                data: {
                    dataProposta,
                    valorTotal,
                    produtos: {
                        create: produto.map(prod => ({
                            nome: prod.nome,
                            preco: prod.preco,
                            quantidade: prod.quantidade,
                            unidadeDeMedida: prod.unidadeDeMedida
                        }))  
                    },
                    servicos: {
                        create: servico.map(serv => ({
                            nome: serv.nome,
                            preco: serv.preco,
                        }))
                    }
                }
            })
            return versao
        } catch(error) {
            console.log(error)
            return null
        }
    }
    async deleteVersao(versaoId: string): Promise<any | null> {
        return prisma.proposta.delete({ where: { id: versaoId } });
    }
}