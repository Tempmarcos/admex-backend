import { PrismaClient } from "@prisma/client";
import { PropostaRepository } from "../interfaceDB/propostaRepository";
import { VersaoPropostaDTO } from "../../../dtos/VersaoPropostaDTO";
import { PropostaDTO } from "../../../dtos/PropostaDTO";
import { PropostaUpdateDTO } from "../../../dtos/PropostaUpdateDTO";



const prisma = new PrismaClient();

export class PrismaPropostaRepository implements PropostaRepository {
    findById(id: string): Promise<any | null> {
        return prisma.proposta.findUnique({ where: { id } })
    }
    createVersao(data: VersaoPropostaDTO, propostaId: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    create(data: PropostaDTO, empresaId: string): Promise<any | null> {
        throw new Error("Method not implemented.");
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
    update(data: PropostaUpdateDTO, id: string): Promise<any | null> {
        throw new Error("Method not implemented.");
    }
    
}