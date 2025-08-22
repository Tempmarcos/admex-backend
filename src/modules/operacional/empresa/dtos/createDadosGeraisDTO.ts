import { z } from "zod";


export const dadosGeraisSchema = z.object({
    nome: z.string().min(3, "Nome muito curto").max(70, "Nome muito longo"),
    nomeFantasia: z.string().min(3, "Nome muito curto").max(50, "Nome muito longo"),
    dataDeFundacao: z.preprocess((val) => {
    if (typeof val === "string") {
      return new Date(val); // transforma string em Date
    }
    return val;
  }, z.date()),
    logo: z.string().optional(),
    endereco: z.any()

})


export type CreateDadosGeraisDTO = z.infer<typeof dadosGeraisSchema>;
