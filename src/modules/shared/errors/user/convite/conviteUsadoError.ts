import { BaseError } from "../../baseError/BaseError";

export class ConviteUsadoError extends BaseError {
    constructor(message: string = "Convite já foi usado ou cancelado", details?: any) {
        super(400, message, details)
    }
}