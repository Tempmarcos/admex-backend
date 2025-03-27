import { itemDTO, itemSchema } from "../../dtos/itemDTO";
import { ItemRepository } from "../../infra/repositories/interfaceDB/itemRepository";

export class UpdateItemUseCase {
  constructor(private repository: ItemRepository) {}

  async execute(item: itemDTO, id: string): Promise<void> {
    itemSchema.parse(item)
    await this.repository.update(item, id);
  }
}