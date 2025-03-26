import { itemDTO } from "../../../dtos/itemDTO"

export interface ItemRepository {
        findById(id: string): Promise<any | null>
        create(data: itemDTO, empresaId: string): Promise<any | null>
        // findByCodigo(registro: string): Promise<any | null> ???????????????????????????????????
        list(empresaId: string): Promise<any | null>
        delete(id: string): Promise<any | null>
        get(id: string): Promise<any | null>
        update(data: itemDTO, id: string): Promise<any | null>
}