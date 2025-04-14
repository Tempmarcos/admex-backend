import { CreateVersaoPropostaDTO } from "../../../dtos/CreateVersaoPropostaDTO"
import { PropostaDTO } from "../../../dtos/PropostaDTO"
import { PropostaUpdateDTO } from "../../../dtos/PropostaUpdateDTO"
import { VersaoPropostaUpdateDTO } from "../../../dtos/VersaoPropostaUpdateDTO"

export interface PropostaRepository {
        findById(id: string): Promise<any | null>
        create(data: PropostaDTO, empresaId: string): Promise<any | null>
        list(empresaId: string): Promise<any | null>
        delete(id: string): Promise<any | null>
        get(id: string): Promise<any | null>
        update(data: PropostaUpdateDTO, id: string): Promise<any | null>
        createVersao(data: CreateVersaoPropostaDTO, propostaId: string): Promise<any | null>
        updateVersao(data: VersaoPropostaUpdateDTO, versaoId: string): Promise<any | null>
        deleteVersao(versaoId: string): Promise<any | null>
}