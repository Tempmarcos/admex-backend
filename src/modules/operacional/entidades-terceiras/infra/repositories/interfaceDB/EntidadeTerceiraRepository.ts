import { entidadeTerceiraDTO } from "../../../dtos/entidadeTerceiraDTO"

export interface EntidadeTerceiraRepository {
        findById(id: string): Promise<any | null>
        create(data: entidadeTerceiraDTO, empresaId: string): Promise<any | null>
        findByRegistro(registro: string): Promise<any | null>
        list(empresaId: string): Promise<any | null>
        delete(id: string): Promise<any | null>
        get(id: string): Promise<any | null>
        update(data: any, id: string): Promise<any | null>
}