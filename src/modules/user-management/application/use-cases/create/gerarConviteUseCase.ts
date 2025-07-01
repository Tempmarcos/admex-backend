import { AuthInterface } from "../../../infra/services/auth/authInterface";

export class GerarConviteUseCase {
    constructor(private authInterface: AuthInterface) { }

    async execute(empresaId: string): Promise<string> {
        const token = await this.authInterface.sign({ empresaId }, '6h');
        //console.log(token)
        return token
    }
}