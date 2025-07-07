import { Convite } from "@prisma/client"
import { ListConviteDTO } from "../../../dtos/convite/ListConviteDTO"


export interface ConviteRepository {
    findByToken(token: string, empresaId: string): Promise<Convite | null>
    create(token: string, empresaId: string): Promise<Convite | null>
    list(empresaId: string): Promise<ListConviteDTO[]>
    delete(id: string): Promise<Convite | null>
}