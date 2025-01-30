import { z } from "zod";
import { InvalidPerfilError } from "../../../../shared/errors/perfil/invalidPerfilError";

const perfilSchema = z.object({
    foto: z.string(),
    nomeDeUsuario: z.string().min(3).max(50),
    tema: z.string().regex(/^[a-zA-Z]+$/),
    fonte: z.number().min(4).max(12)
})

type PerfilProps = z.infer<typeof perfilSchema>

export class Perfil{
    static validate(value: PerfilProps){
        try{
            perfilSchema.parse(value);
        }catch(error){
            throw new InvalidPerfilError();
        }
        return value;
    }
}