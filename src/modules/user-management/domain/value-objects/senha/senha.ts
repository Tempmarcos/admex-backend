import { z } from "zod";
import { InvalidSenhaError } from "../../../../shared/errors/senha/invalidSenhaError";

const SenhaSchema = z.string().min(3, "Senha muito curta");

export class Senha {
    static validate(value: string) : String {
        try{
            SenhaSchema.parse(value)
        }catch(error){
            throw new InvalidSenhaError();
        }
        return value;
    }
}