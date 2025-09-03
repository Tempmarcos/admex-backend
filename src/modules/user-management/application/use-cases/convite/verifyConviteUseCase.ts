import { ConviteNotExistsError } from "../../../../shared/errors/user/convite/conviteNotExistsError";
import { ConviteUsadoError } from "../../../../shared/errors/user/convite/conviteUsadoError";
import { InvalidConviteError } from "../../../../shared/errors/user/convite/invalidConviteError";
import { ConviteRepository } from "../../../infra/repositories/interfaceDB/ConviteRepository";
import { AuthInterface } from "../../../infra/services/auth/authInterface";

export class VerifyConviteUseCase {
    constructor(private conviteRepository: ConviteRepository, private authInterface: AuthInterface) { }

    async execute(conviteToken: string): Promise<string> {
        const decodedToken = await this.authInterface.verify(conviteToken)
        if (!decodedToken) {
            throw new InvalidConviteError();
        }
        const token = decodedToken.token;
        const empresaId = decodedToken.empresaId
        const conviteExist = await this.conviteRepository.findByToken(token, empresaId)
        if (!conviteExist) {
            throw new ConviteNotExistsError()
        }
        if (conviteExist.cancelado === true || conviteExist.usado === true) {
            throw new ConviteUsadoError()
        }
        return decodedToken.empresaId
    }
};