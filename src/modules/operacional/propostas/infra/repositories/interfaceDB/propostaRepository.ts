import { CreateRevisaoDTO } from "../../../dtos/CreateRevisaoDTO"
import { PropostaDTO } from "../../../dtos/PropostaDTO"
import { PropostaUpdateDTO } from "../../../dtos/PropostaUpdateDTO"
import { RevisaoUpdateDTO } from "../../../dtos/RevisaoUpdateDTO"


export interface PropostaRepository {
        findById(id: string): Promise<any | null>
        checarUltimoCodigo(empresaId: string): Promise <string | null>
        create(data: PropostaDTO, empresaId: string): Promise<any | null>
        list(empresaId: string): Promise<any | null>
        delete(id: string): Promise<any | null>
        get(id: string): Promise<any | null>
        update(data: PropostaUpdateDTO, id: string): Promise<any | null>
        createRevisao(data: CreateRevisaoDTO, propostaId: string): Promise<any | null>
        updateRevisao(data: RevisaoUpdateDTO, revisaoId: string): Promise<any | null>
        deleteRevisao(revisaoId: string): Promise<any | null>
}