import { TarefaCreateDTO } from "../../../dtos/tarefaCreateDTO"
import { TarefaUpdateDTO } from "../../../dtos/tarefaUpdateDTO"

export interface TarefaRepository {
        findById(id: string): Promise<any | null>
        checarTarefasAtrasadas(): Promise<any | null>
        atualizarTarefasAtrasadas(): Promise<any | null>
        create(data: TarefaCreateDTO, empresaId: string): Promise<any | null>
        list(empresaId: string): Promise<any | null>
        delete(id: string): Promise<any | null>
        get(id: string): Promise<any | null>
        update(data: TarefaUpdateDTO, id: string): Promise<any | null>
}