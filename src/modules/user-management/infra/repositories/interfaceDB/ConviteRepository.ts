import { Convite } from "@prisma/client"
import { ListConviteDTO } from "../../../dtos/convite/ListConviteDTO"
import { CreateConviteDTO } from "../../../dtos/convite/CreateConviteDTO"


export interface ConviteRepository {
    findByToken(token: string, empresaId: string): Promise<Convite | null>
    create(data: CreateConviteDTO, empresaId: string): Promise<Convite | null>
    list(empresaId: string): Promise<ListConviteDTO[]>
    delete(id: string): Promise<Convite | null>
    cancelarConvite(id: string): Promise<Convite | null>
    utilizarConvite(id: string, used_by: string): Promise<Convite | null>
}