import { BaseError } from "../baseError/BaseError";


export class InvalidCodeError extends BaseError {
    constructor(message: string = "Código inválido ou expirado", details?: any) {
        super(400, message, details)
    }
}