import { itemDTO, itemSchema } from "../../dtos/itemDTO";
import { ItemRepository } from "../../infra/repositories/interfaceDB/itemRepository";


export class CreateItemUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(item: itemDTO, empresaId: string): Promise<void> {
    itemSchema.parse(item)
    await this.repository.create(item, empresaId);
  }
}