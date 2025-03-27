import { ItemNotExistsError } from "../../../../shared/errors/item/itemNotExistsError";
import { ItemRepository } from "../../infra/repositories/interfaceDB/itemRepository";

export class GetItemUseCase {
    constructor(private repository: ItemRepository) {}

     async execute(id: string): Promise<void> {
        const entidadeExists = await this.repository.findById(id)
        
        if(!entidadeExists) {
            throw new ItemNotExistsError();
        }
        
        await this.repository.get(id)
     }
}