import { RegistroAlreadyExistsError } from "../../../../shared/errors/empresa/registroAlreadyExistsError";
import { EntityNotExistsError } from "../../../../shared/errors/entidades/EntityNotExistsError";
import { EnderecoFactory } from "../../../shared/endereco/enderecoFactory";
import { entidadeTerceiraDTO } from "../../dtos/entidadeTerceiraDTO";
import { EntidadeTerceiraRepository } from "../../infra/repositories/interfaceDB/EntidadeTerceiraRepository";


export class UpdateEntidadeUseCase {
  constructor(private repository: EntidadeTerceiraRepository) {}

  async execute(entidade: entidadeTerceiraDTO, id: string): Promise<void> {
    const entidadeExists = await this.repository.findById(id)
            
    if(!entidadeExists) {
        throw new EntityNotExistsError;
    }
    
    if(entidadeExists.registro != entidade.registro){
        const registroExists = await this.repository.findByRegistro(entidade.registro)
        if(registroExists) throw new RegistroAlreadyExistsError;
    }


    const enderecoFormatado = EnderecoFactory.criar(entidade.endereco)
    enderecoFormatado.validar()
    entidade.endereco = enderecoFormatado //Criar endereço com base no país
    

    await this.repository.update(entidade, id);
  }
}