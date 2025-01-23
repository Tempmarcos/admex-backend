import { z } from "zod";

const EmailSchema = z.string().email('Precisa ser um email válido');

export class Email {
    private constructor(private readonly value: string){

    }

    static validate(value: string): Email  {
        try{
            EmailSchema.parse(value);
        }catch(error){
            throw new Error('Email inválido')
        }
        return new Email(value);
    }

    getValue(): string {
        return this.value;
    }
}