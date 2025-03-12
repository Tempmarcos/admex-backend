// import { Empresa } from "../../../domain/entities/empresa"
import { Empresa } from "@prisma/client"
import { CreateEmpresaDTO } from "../../../dtos/CreateEmpresaDTO"

export interface EmpresaRepository {
    findById(id: string): Promise<Empresa | null>
    create(data: CreateEmpresaDTO): Promise<Empresa | null>
    findByRegistro(registro: string): Promise<Empresa | null>
    // list(empresaId: string): Promise<ListEmpresaDTO[]>
    delete(id: string): Promise<Empresa | null>
    // get(id: string): Promise<GetEmpresaDTO | null>
    // update(data: UpdateEmpresaDTO, id: string): Promise<User | null>
    // updatePerfil(data: UpdatePerfilInputDTO, id: string): Promise<User | null>
    // updateSenha(senha: string, id: string): Promise<User | null>
    // updateEmail(email: string, id: string) : Promise<User | null>
}