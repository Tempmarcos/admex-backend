import { PrismaClient } from "@prisma/client";
import { TarefaCreateDTO } from "../../../dtos/tarefaCreateDTO";
import { TarefaUpdateDTO } from "../../../dtos/tarefaUpdateDTO";
import { TarefaRepository } from "../interfaceDB/tarefaRepository";
import { TarefaNotExistsError } from "../../../../../shared/errors/tarefa/TarefaNotExistsError";

const prisma = new PrismaClient();

export class PrismaTarefaRepository implements TarefaRepository {
    async atualizarTarefasAtrasadas(): Promise<any | null> {
        const agora = new Date();
        try {
            // 1. Atualiza todas as tarefas atrasadas de uma vez
            const { count } = await prisma.tarefa.updateMany({
            where: {
                AND: [
                { status: { notIn: ['executada', 'cancelada'] } }, // Não concluídas nem canceladas
                { dataAgendada: { lt: agora } },                   // Data passou do prazo
                { status: { not: 'atrasada' } }                    // Que ainda não estão marcadas como atrasadas
                ]
            },
            data: {
                status: 'atrasada',
            }
            });

            console.log(`✅ ${count} tarefas marcadas como atrasadas`);
            return count;
        } catch (error) {
            console.error('Erro ao atualizar tarefas atrasadas:', error);
            throw error;
        }
    }
    async checarTarefasAtrasadas(): Promise<any | null> {
        const agora = new Date();
        const limite24h = new Date(agora.getTime() + 24 * 60 * 60 * 1000);

        // Tarefas a vencer em 24h (ativas)
        const tarefasProximoPrazo = await prisma.tarefa.findMany({
            where: {
            AND: [
                { status: { notIn: ['executada', 'cancelada'] } },
                { dataAgendada: { gt: agora, lte: limite24h } }
            ]
            }
        });

        // Tarefas vencidas (ativas)
        const tarefasAtrasadas = await prisma.tarefa.findMany({
            where: {
                status: 'atrasada'
            }
        });

        return {
            proximoPrazo: tarefasProximoPrazo,
            atrasadas: tarefasAtrasadas,
            total: tarefasProximoPrazo.length + tarefasAtrasadas.length
        };
    }
    findById(id: string): Promise<any | null> {
        return prisma.tarefa.findUnique({ where: { id } })
    }
    async create(data: TarefaCreateDTO, empresaId: string): Promise<any | null> {
        try{
            const{nome, tipo, status, responsavelId, criadorId, dataAgendada, dataExecutada} = data;
            const tarefa = await prisma.tarefa.create({
                data: {
                    nome, tipo, status, 
                    userResponsavelId: responsavelId,
                    userCriadorId: criadorId,
                    dataAgendada,
                    dataExecutada,
                    empresaId: empresaId
                }
            })
            return tarefa
        }catch (error){
            console.log(error)
            return null
        }
    }
    async list(empresaId: string): Promise<any | null> {
        return await prisma.tarefa.findMany({
            where: { empresaId },
            select: {
                id: true, nome: true, status: true,
                responsavel: {
                    select: {
                        id: true,
                        nome: true
                    }
                }
             }
         });
    }
    delete(id: string): Promise<any | null> {
        return prisma.tarefa.delete({ where: { id } });
    }
    async get(id: string): Promise<any | null> {
        try{
            const tarefa = await prisma.tarefa.findUnique({
                where: {
                    id,
                },
                select: {
                    id: true,
                    nome: true,
                    empresaId: true,
                    tipo: true,
                    status: true,
                    dataAgendada: true,
                    dataExecutada: true,
                    responsavel: {
                        select: {
                            id: true,
                            nome: true
                        }
                    },
                    criador: {
                        select: {
                            id: true,
                            nome: true
                        }
                    }
                },
            })
                
            if (!tarefa) throw new TarefaNotExistsError
                
            return tarefa
              
        } catch (error) {
            throw new Error()
        }         
    }
    async update(data: TarefaUpdateDTO, id: string): Promise<any | null> {
        try{
            const{nome, tipo, status, responsavelId, dataAgendada, dataExecutada} = data;
            const tarefa = await prisma.tarefa.update({
                where: {
                    id,
                },
                data: {
                    nome, tipo, status, 
                    userResponsavelId: responsavelId,
                    dataAgendada,
                    dataExecutada,
                }
            })
            return tarefa
        }catch (error){
            throw new Error()
        }
    }
    
}