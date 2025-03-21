import { EntityNotExistsError } from "../../../../shared/errors/entidades/EntityNotExistsError";
import { EntidadeTerceiraRepository } from "../../infra/repositories/interfaceDB/EntidadeTerceiraRepository";

export class DeleteEntidadeUseCase {
    constructor(private repository: EntidadeTerceiraRepository) {}

     async execute(id: string): Promise<void> {
        const entidadeExists = await this.repository.findById(id)
        
        if(!entidadeExists) {
            throw new EntityNotExistsError();
        }
        
        await this.repository.delete(id)
     }
}