import { RevisaoUpdateDTO, revisaoUpdateSchema } from "../../../dtos/RevisaoUpdateDTO";
import { PropostaRepository } from "../../../infra/repositories/interfaceDB/propostaRepository";

export class UpdateRevisaoUseCase {
  constructor(private repository: PropostaRepository) {}

  async execute(revisao: RevisaoUpdateDTO, id: string): Promise<void> {
    revisaoUpdateSchema.parse(revisao)
    await this.repository.updateRevisao(revisao, id);
  }
}