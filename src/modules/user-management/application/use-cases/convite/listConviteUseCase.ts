import { ConviteRepository } from "../../../infra/repositories/interfaceDB/ConviteRepository";
import { ListConviteDTO } from "../../../dtos/convite/ListConviteDTO";


export class ListConviteUseCase {
    constructor(private conviteRepository: ConviteRepository) { }

    async execute(empresaId: string): Promise<ListConviteDTO[]> {
        return this.conviteRepository.list(empresaId)
    }
}