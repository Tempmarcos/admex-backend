import { VersaoPropostaUpdateDTO, versaoUpdateSchema } from "../../../dtos/VersaoPropostaUpdateDTO";
import { PropostaRepository } from "../../../infra/repositories/interfaceDB/propostaRepository";

export class UpdateVersaoUseCase {
  constructor(private repository: PropostaRepository) {}

  async execute(versao: VersaoPropostaUpdateDTO, id: string): Promise<void> {
    versaoUpdateSchema.parse(versao)
    await this.repository.updateVersao(versao, id);
  }
}