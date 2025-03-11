import { z } from "zod";


export const dadosGeraisSchema = z.object({
    nome: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo")
.regex(/^[a-zA-ZÀ-ÿ]+(?: [a-zA-ZÀ-ÿ]+)*$/, "Nome não pode conter caracteres especiais"),
    dataDeFundacao: z.date().max(new Date(), "Data deve ser menor que a data atual"),
    logo: z.string().optional(),
    endereco: z.any()

})


export type CreateDadosGeraisDTO = z.infer<typeof dadosGeraisSchema>;
