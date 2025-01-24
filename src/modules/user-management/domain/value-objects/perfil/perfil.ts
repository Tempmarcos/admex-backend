import { z } from "zod";

interface ProfileProps {
    foto: string;
    nomeDeUsuario: string;
    tema: string;
}

const perfilSchema = z.object({
    foto: z.string(),
    nomeDeUsuario: z.string(),
    
})

export class Perfil{

}