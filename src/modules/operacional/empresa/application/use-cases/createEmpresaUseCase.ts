import { EmailAlreadyExistsError } from "../../../../shared/errors/email/emailAlreadyExistsError";
import { RegistroAlreadyExistsError } from "../../../../shared/errors/empresa/registroAlreadyExistsError";
import { CreateUserInputDTO } from "../../../../user-management/dtos/user/CreateUserInputDTO";
import { UserRepository } from "../../../../user-management/infra/repositories/interfaceDB/UserRepository";
import { EnderecoFactory } from "../../../shared/endereco/enderecoFactory";
import { DadosFinanceiros } from "../../domain/value-objects/dadosFinanceiros/dadosFinanceiros";
import { DadosFiscaisFactory } from "../../domain/value-objects/dadosFiscais/dadosFiscaisFactory";
import { DadosGerais } from "../../domain/value-objects/dadosGerais/dadosGerais";
import { CreateEmpresaDTO } from "../../dtos/CreateEmpresaDTO";
import { EmpresaRepository } from "../../infra/repositories/interfaceDB/EmpresaRepository";

export class CreateEmpresaUseCase {
    constructor(
        private empresaRepository: EmpresaRepository,
        private userRepository: UserRepository
    ){}

    async execute(empresa: CreateEmpresaDTO, user: CreateUserInputDTO)
    // : Promise<{empresa: Empresa; admin: Usuario}
    {
        const registroExists = await this.empresaRepository.findByRegistro
        (empresa.DadosFiscais.registro) //Verificar se registro de empresa já existe
        if(registroExists) throw new RegistroAlreadyExistsError;


        const enderecoFormatado = EnderecoFactory.criar(empresa.DadosGerais.endereco)
        enderecoFormatado.validar()
        empresa.DadosGerais.endereco = enderecoFormatado //Criar endereço com base no país
        const dadosGeraisData = await DadosGerais.create(empresa.DadosGerais)

        //Criar Dados Fiscais com base no país
        const pais = enderecoFormatado.pais
        const dadosFiscaisData= DadosFiscaisFactory.criar(pais, empresa.DadosFiscais)
        dadosFiscaisData.validarRegistro(dadosFiscaisData.registro)

        const dadosFinanceirosData = await DadosFinanceiros.create(empresa.DadosFinanceiros)

        const empresaCriada = await this.empresaRepository.create({ 
            DadosGerais: dadosGeraisData, 
            DadosFiscais: dadosFiscaisData, 
            DadosFinanceiros: dadosFinanceirosData 
        })


        const emailExists = await this.userRepository.findByEmail(user.email);
        if (emailExists) throw new EmailAlreadyExistsError;
        if(user.admin === false) user.admin = true //verificando que o user é admin
        const admin = await this.userRepository.create(user, empresaCriada!.id)


        return {empresa, admin}
    }

}