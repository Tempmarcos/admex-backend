import { z } from "zod";

const SenhaSchema = z.string().min(3, "Senha muito curta");

export class Senha {
    private constructor(private readonly value: string){
        
    }

    static create(value: string): Senha {
        return new Senha(value);
    }

    static validate(value: string) {
        SenhaSchema.parse(value)
    }

    getValue(): string {
        return this.value;
    }
}