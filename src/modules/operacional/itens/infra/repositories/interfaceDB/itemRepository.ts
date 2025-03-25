export interface ItemRepository {
        findById(id: string): Promise<any | null>
        // create(data: entidadeTerceiraDTO, empresaId: string): Promise<any | null>
        // findByRegistro(registro: string): Promise<any | null>
        // list(empresaId: string): Promise<any | null>
        // delete(id: string): Promise<any | null>
        // get(id: string): Promise<any | null>
        // update(data: entidadeTerceiraDTO, id: string): Promise<any | null>
}