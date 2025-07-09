import { BaseError } from "../../baseError/BaseError";


export class ConviteNotExistsError extends BaseError {
    constructor(message: string = "Convite não existe", details?: any) {
        super(400, message, details)
    }
}