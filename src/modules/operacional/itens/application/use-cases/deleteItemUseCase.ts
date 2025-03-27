import { ItemNotExistsError } from "../../../../shared/errors/item/itemNotExistsError";
import { ItemRepository } from "../../infra/repositories/interfaceDB/itemRepository";

export class DeleteItemUseCase {
    constructor(private repository: ItemRepository) {}

     async execute(id: string): Promise<void> {
        const itemExists = await this.repository.findById(id)
        
        if(!itemExists) {
            throw new ItemNotExistsError();
        }
        
        await this.repository.delete(id)
     }
}