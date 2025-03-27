import { ItemRepository } from "../../infra/repositories/interfaceDB/itemRepository";

export class ListItemUseCase {
    constructor(private repository: ItemRepository) {}

     async execute(empresaId: string): Promise<void> {
        return this.repository.list(empresaId)
     }
}