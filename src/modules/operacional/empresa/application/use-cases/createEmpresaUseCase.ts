import { EmailAlreadyExistsError } from "../../../../shared/errors/email/emailAlreadyExistsError";
import { RegistroAlreadyExistsError } from "../../../../shared/errors/empresa/registroAlreadyExistsError";
import { CreateUserUseCase } from "../../../../user-management/application/use-cases/create/createUserUseCase";
import { User } from "../../../../user-management/domain/entities/user";
import { Permissoes } from "../../../../user-management/domain/value-objects/permissoes/permissoes";
import { CreateUserInputDTO } from "../../../../user-management/dtos/user/CreateUserInputDTO";
import { UserRepository } from "../../../../user-management/infra/repositories/interfaceDB/UserRepository";
import { PasswordHasher } from "../../../../user-management/infra/services/passwordHasher";
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

    async execute(empresa: CreateEmpresaDTO)
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

        const emailExists = await this.userRepository.findByEmail(empresa.User.email);
        if (emailExists) throw new EmailAlreadyExistsError;
        empresa.User.senha = await PasswordHasher.hash(empresa.User.senha);
        Permissoes.validatePermissions(empresa.User.permissoes);
        User.nomeValidate(empresa.User.nome)
        //verificando que o user é admin
        if(empresa.User.admin === false) empresa.User.admin = true 

        const empresaCriada = await this.empresaRepository.create({ 
            DadosGerais: dadosGeraisData, 
            DadosFiscais: dadosFiscaisData, 
            DadosFinanceiros: dadosFinanceirosData,
            User: empresa.User
        })

        return {empresaCriada}
    }

}