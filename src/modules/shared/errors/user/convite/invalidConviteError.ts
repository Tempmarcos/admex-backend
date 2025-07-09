import { BaseError } from "../../baseError/BaseError";

export class InvalidConviteError extends BaseError {
    constructor(message: string = "Convite inválido ou expirado", details?: any) {
        super(400, message, details)
    }
}