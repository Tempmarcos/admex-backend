// import { Empresa } from "../../../domain/entities/empresa"
import { Empresa } from "@prisma/client"
import { CreateEmpresaDTO } from "../../../dtos/CreateEmpresaDTO"
import { ListEmpresaDTO } from "../../../dtos/listEmpresaDTO"
import { GetEmpresaDTO } from "../../../dtos/getEmpresaDTO"
import { CreateDadosGeraisDTO } from "../../../dtos/createDadosGeraisDTO"
import { CreateDadosFinanceirosDTO } from "../../../dtos/createDadosFinanceirosDTO"
import { DadosFiscaisDTO } from "../../../dtos/DadosFiscais/DadosFiscaisDTO"

export interface EmpresaRepository {
    findById(id: string): Promise<Empresa | null>
    create(data: CreateEmpresaDTO): Promise<Empresa | null>
    findByRegistro(registro: string): Promise<Empresa | null>
    verifyRegistro(registro: string): Promise<boolean>
    list(): Promise<ListEmpresaDTO[]>
    delete(id: string): Promise<Empresa | null>
    get(id: string): Promise<GetEmpresaDTO | null>
    updateDadosGerais(data: CreateDadosGeraisDTO, id: string): Promise<Empresa | null>
    updateDadosFiscais(data: DadosFiscaisDTO, id: string): Promise<Empresa | null>
    updateDadosFinanceiros(data: CreateDadosFinanceirosDTO, id: string): Promise<Empresa | null>
}