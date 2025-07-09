import { ConviteRepository } from "../../../infra/repositories/interfaceDB/ConviteRepository";


export class CancelarConviteUseCase {
    constructor(private conviteRepository: ConviteRepository) { }

    async execute(id: string): Promise<void> {
        await this.conviteRepository.cancelarConvite(id)
    }
};