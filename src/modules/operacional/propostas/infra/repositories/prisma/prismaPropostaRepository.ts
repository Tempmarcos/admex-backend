import { PrismaClient } from "@prisma/client";
import { PropostaRepository } from "../interfaceDB/propostaRepository";
import { PropostaDTO } from "../../../dtos/PropostaDTO";
import { PropostaUpdateDTO } from "../../../dtos/PropostaUpdateDTO";
import { PropostaNotExistsError } from "../../../../../shared/errors/proposta/propostaNotExistsError";
import { CreateRevisaoDTO } from "../../../dtos/CreateRevisaoDTO";
import { RevisaoUpdateDTO } from "../../../dtos/RevisaoUpdateDTO";



const prisma = new PrismaClient();

export class PrismaPropostaRepository implements PropostaRepository {
    async checarUltimoCodigo(empresaId: string): Promise<string | null> {
        const anoAtual = new Date().getFullYear().toString().slice(-2); // "25"

        // Buscar o maior número de código do ano atual para essa empresa
        const ultimaProposta = await prisma.proposta.findFirst({
            where: {
            empresaId,
            codigo: {
                endsWith: `-${anoAtual}`,
            },
            },
            orderBy: {
            codigo: 'desc',
            },
        });

        let novoNumero = 1;

        if (ultimaProposta?.codigo) {
            // Extrai a parte numérica antes do "-"
            const [numero] = ultimaProposta.codigo.split("-");
            const numInt = parseInt(numero, 10);
            if (!isNaN(numInt)) {
            novoNumero = numInt + 1;
            }
        }

        // Garante formato com 3 dígitos
        const numeroFormatado = String(novoNumero).padStart(3, "0");

        const novoCodigo = `${numeroFormatado}-${anoAtual}`;

        return novoCodigo;
    }
    findById(id: string): Promise<any | null> {
        return prisma.proposta.findUnique({ where: { id } })
    }
    async create(data: PropostaDTO, empresaId: string): Promise<any | null> {
        try{
            const{clienteId, status, codigo, descricao} = data;
            const proposta = await prisma.proposta.create({
                data: {
                    status,
                    descricao,
                    codigo,
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
                codigo: true,
                status: true,
                cliente: {
                    select: {
                        nome: true
                    }
                }
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
                    revisoes: {
                        select: {
                            id: true,
                            dataProposta: true,
                            valorTotal: true,
                            numeroRevisao: true,
                            createdAt: true,
                            aprovado: true,
                            executado: true,
                            itens: {
                                select: {
                                    id: true,
                                    nome: true,
                                    preco: true,
                                    quantidade: true,
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
            const{ status, descricao } = data;
            const proposta = await prisma.proposta.update({
                where: {
                    id
                },
                data: {
                    status,
                    descricao,
                }
            })
            return proposta
        }catch (error){
            console.log(error)
            return null
        }
    }

    async createRevisao(data: CreateRevisaoDTO, propostaId: string): Promise<any | null> {
        const ultimaRevisao = await prisma.revisao.findFirst({
            where: { propostaId },
            orderBy: { numeroRevisao: 'desc' },
            select: { numeroRevisao: true }
          });
        
        const novoNumeroRevisao = (ultimaRevisao?.numeroRevisao || 0) + 1;

        try {
            const { dataProposta, valorTotal, itens } = data;
            const revisao = await prisma.revisao.create({
                data: {
                    dataProposta,
                    numeroRevisao: novoNumeroRevisao,
                    valorTotal,
                    itens: {
                        create: itens.map(prod => ({
                            nome: prod.nome,
                            preco: prod.preco,
                            quantidade: prod.quantidade,
                        }))  
                    },
                    propostaId: propostaId
                }
            })
            return revisao
        } catch(error) {
            console.log(error)
            return null
        }
    }

    async updateRevisao(data: RevisaoUpdateDTO, revisaoId: string): Promise<any | null> {
        try {
            const { dataProposta, valorTotal, itens } = data;
            const revisao = await prisma.revisao.update({
                where:{
                    id: revisaoId
                },
                data: {
                    dataProposta,
                    valorTotal,
                    itens: {
                        create: itens.map(prod => ({
                            nome: prod.nome,
                            preco: prod.preco,
                            quantidade: prod.quantidade,
                        }))  
                    },
                }
            })
            return revisao
        } catch(error) {
            console.log(error)
            return null
        }
    }
    async deleteRevisao(revisaoId: string): Promise<any | null> {
        return prisma.proposta.delete({ where: { id: revisaoId } });
    }
}