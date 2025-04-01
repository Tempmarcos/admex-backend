import { PrismaClient } from "@prisma/client";
import { TarefaCreateDTO } from "../../../dtos/tarefaCreateDTO";
import { TarefaUpdateDTO } from "../../../dtos/tarefaUpdateDTO";
import { TarefaRepository } from "../interfaceDB/tarefaRepository";

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
    list(empresaId: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    delete(id: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    get(id: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    update(data: TarefaUpdateDTO, id: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    
}