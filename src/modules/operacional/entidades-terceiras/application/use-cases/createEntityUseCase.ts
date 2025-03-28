import { RegistroAlreadyExistsError } from "../../../../shared/errors/empresa/registroAlreadyExistsError";
import { EnderecoFactory } from "../../../shared/endereco/enderecoFactory";
import { entidadeTerceiraDTO } from "../../dtos/entidadeTerceiraDTO";
import { EntidadeTerceiraRepository } from "../../infra/repositories/interfaceDB/EntidadeTerceiraRepository";


export class CreateEntidadeUseCase {
  constructor(private repository: EntidadeTerceiraRepository) {}

  async execute(entidade: entidadeTerceiraDTO, empresaId: string): Promise<void> {
    const registroExists = await this.repository.findByRegistro(entidade.registro)
    if(registroExists) throw new RegistroAlreadyExistsError;

    const enderecoFormatado = EnderecoFactory.criar(entidade.endereco)
    enderecoFormatado.validar()
    entidade.endereco = enderecoFormatado //Criar endereço com base no país

    await this.repository.create(entidade, empresaId);
  }
}