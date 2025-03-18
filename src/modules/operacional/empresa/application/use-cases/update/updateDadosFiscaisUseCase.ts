import { RegistroAlreadyExistsError } from "../../../../../shared/errors/empresa/registroAlreadyExistsError";
import { EnderecoFactory } from "../../../../shared/endereco/enderecoFactory";
import { DadosFiscais } from "../../../domain/value-objects/dadosFiscais/dadosFiscais";
import { DadosFiscaisFactory } from "../../../domain/value-objects/dadosFiscais/dadosFiscaisFactory";
import { DadosGerais } from "../../../domain/value-objects/dadosGerais/dadosGerais";
import { DadosFiscaisDTO } from "../../../dtos/DadosFiscais/DadosFiscaisDTO";
import { EmpresaRepository } from "../../../infra/repositories/interfaceDB/EmpresaRepository";

export class UpdateDadosFiscaisUseCase {
    constructor(private empresaRepository: EmpresaRepository){}

    async execute(props: DadosFiscaisDTO, id: string, pais: string){
        // console.log(props.camposEspecificos)
        const registroExists = await this.empresaRepository.findByRegistro
        (props.registro) //Verificar se registro de empresa já existe
        if(registroExists) throw new RegistroAlreadyExistsError;

        const dadosFormatados = DadosFiscaisFactory.criar(pais, props)
        // console.log(enderecoFormatado)
        dadosFormatados.validarRegistro(dadosFormatados.registro)


        this.empresaRepository.updateDadosFiscais(dadosFormatados, id)
    }
}