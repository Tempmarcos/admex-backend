import { EntidadeTerceiraRepository } from "../../infra/repositories/interfaceDB/EntidadeTerceiraRepository";

export class ListEntidadeUseCase {
    constructor(private repository: EntidadeTerceiraRepository) {}

     async execute(empresaId: string): Promise<void> {
        return this.repository.list(empresaId)
     }
}