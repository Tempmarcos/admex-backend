import { PrismaClient } from "@prisma/client";
import { TarefaCreateDTO } from "../../../dtos/tarefaCreateDTO";
import { TarefaUpdateDTO } from "../../../dtos/tarefaUpdateDTO";
import { TarefaRepository } from "../interfaceDB/tarefaRepository";
import { TarefaNotExistsError } from "../../../../../shared/errors/tarefa/TarefaNotExistsError";

const prisma = new PrismaClient();

export class PrismaTarefaRepository implements TarefaRepository {
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