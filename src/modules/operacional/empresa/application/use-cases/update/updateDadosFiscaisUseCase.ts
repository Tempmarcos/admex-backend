import { EmpresaNotExistsError } from "../../../../../shared/errors/empresa/empresaNotExistsError";
import { RegistroAlreadyExistsError } from "../../../../../shared/errors/empresa/registroAlreadyExistsError";
import { DadosFiscaisFactory } from "../../../domain/value-objects/dadosFiscais/dadosFiscaisFactory";
import { DadosGerais } from "../../../domain/value-objects/dadosGerais/dadosGerais";
import { DadosFiscaisDTO } from "../../../dtos/DadosFiscais/DadosFiscaisDTO";
import { EmpresaRepository } from "../../../infra/repositories/interfaceDB/EmpresaRepository";

export class UpdateDadosFiscaisUseCase {
    constructor(private empresaRepository: EmpresaRepository){}

    async execute(props: DadosFiscaisDTO, id: string){
        // console.log(props.camposEspecificos)
        const empresa = await this.empresaRepository.get(id)
        if(!empresa) throw new EmpresaNotExistsError();
        const registroExists = await this.empresaRepository.findByRegistro
        (props.registro) //Verificar se registro de empresa já existe
        if(registroExists && props.registro != empresa.DadosFiscais!.registro) throw new RegistroAlreadyExistsError;

        const dadosFormatados = DadosFiscaisFactory.criar(empresa.DadosGerais!.endereco!.pais, props)
        // console.log(enderecoFormatado)
        dadosFormatados.validarRegistro(dadosFormatados.registro)


        this.empresaRepository.updateDadosFiscais(dadosFormatados, id)
    }
}