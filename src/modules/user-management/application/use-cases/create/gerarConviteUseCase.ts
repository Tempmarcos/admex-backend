import { ConviteRepository } from "../../../infra/repositories/interfaceDB/ConviteRepository";
import { AuthInterface } from "../../../infra/services/auth/authInterface";

export class GerarConviteUseCase {
    constructor(private authInterface: AuthInterface, private conviteRepository: ConviteRepository) { }

    async execute(empresaId: string, created_by: string): Promise<string> {
        const token = await this.authInterface.sign({ empresaId }, '6h');
        //console.log(token)
        const agora = new Date();
        const expires_at = new Date(agora.getTime() + 6 * 60 * 60 * 1000);
        const data = { token, created_by, expires_at }
        await this.conviteRepository.create(data, empresaId)
        return token
    }
}