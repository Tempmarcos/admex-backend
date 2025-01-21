import { z } from "zod";

const EmailSchema = z.string().email();

export class Email {
    private constructor(private readonly value: string){

    }


    static create(value: string): Email {
        EmailSchema.parse(value);
        return new Email(value);
    }

    getValue(): string {
        return this.value;
    }
}