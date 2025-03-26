import { z } from "zod";

enum tipos  {
    Compra = 'compra',
    Venda = 'venda',
}

export const itemSchema = z.object({
    nome: z.string(),
    tipo: z.nativeEnum(tipos),
    descricao: z.string(),
    preco: z.number(),
    estoque: z.number().optional(),
    unidadeMedida: z.string().optional(),
    duracao: z.number().optional()
})

export type itemDTO = z.infer<typeof itemSchema>