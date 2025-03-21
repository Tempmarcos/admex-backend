import { RegistroAlreadyExistsError } from "../../../../shared/errors/empresa/registroAlreadyExistsError";
import { DadosFiscaisFactory } from "../../../empresa/domain/value-objects/dadosFiscais/dadosFiscaisFactory";
import { EnderecoFactory } from "../../../shared/endereco/enderecoFactory";
import { entidadeTerceiraDTO } from "../../dtos/entidadeTerceiraDTO";
import { EntidadeTerceiraRepository } from "../../infra/repositories/interfaceDB/EntidadeTerceiraRepository";


export class CreateEntidadeUseCase {
  constructor(private repository: EntidadeTerceiraRepository) {}

  async execute(entidade: entidadeTerceiraDTO, empresaId: string): Promise<void> {
    const registroExists = await this.repository.findByRegistro(entidade.dadosFiscais.registro)
    if(registroExists) throw new RegistroAlreadyExistsError;

    const enderecoFormatado = EnderecoFactory.criar(entidade.endereco)
    enderecoFormatado.validar()
    entidade.endereco = enderecoFormatado //Criar endereço com base no país
    
    const pais = enderecoFormatado.pais
    const dadosFiscaisData= DadosFiscaisFactory.criar(pais, entidade.dadosFiscais)
    dadosFiscaisData.validarRegistro(dadosFiscaisData.registro)

    entidade.dadosFiscais = dadosFiscaisData

    await this.repository.create(entidade, empresaId);
  }
}