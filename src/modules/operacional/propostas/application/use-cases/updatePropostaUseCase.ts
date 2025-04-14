import { PropostaUpdateDTO, propostaUpdateSchema } from "../../dtos/PropostaUpdateDTO";
import { PropostaRepository } from "../../infra/repositories/interfaceDB/propostaRepository";

export class UpdatePropostaUseCase {
  constructor(private repository: PropostaRepository) {}

  async execute(proposta: PropostaUpdateDTO, id: string): Promise<void> {
    propostaUpdateSchema.parse(proposta)
    await this.repository.update(proposta, id);
  }
}