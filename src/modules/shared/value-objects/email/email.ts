import { z } from "zod";
import { EmailInvalidError } from "../../errors/email/emailInvalidError";

const EmailSchema = z.string().email();

export class Email {
    static validate(value: string): String  {
        try{
            EmailSchema.parse(value);
        }catch(error){
            throw new EmailInvalidError();
        }
        return value;
    }
}