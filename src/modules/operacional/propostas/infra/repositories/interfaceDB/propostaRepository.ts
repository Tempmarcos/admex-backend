import { PropostaDTO } from "../../../dtos/PropostaDTO"
import { PropostaUpdateDTO } from "../../../dtos/PropostaUpdateDTO"
import { VersaoPropostaDTO } from "../../../dtos/VersaoPropostaDTO"

export interface PropostaRepository {
        findById(id: string): Promise<any | null>
        createVersao(data: VersaoPropostaDTO, propostaId: string): Promise<any | null>
        create(data: PropostaDTO, empresaId: string): Promise<any | null>
        list(empresaId: string): Promise<any | null>
        delete(id: string): Promise<any | null>
        get(id: string): Promise<any | null>
        update(data: PropostaUpdateDTO, id: string): Promise<any | null>
}