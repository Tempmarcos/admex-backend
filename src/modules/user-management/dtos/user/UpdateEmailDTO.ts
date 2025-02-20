import { z } from "zod";

export const UpdateEmailSchema = z.object({
    emailAtual: z.string().email(),
    novoEmail: z.string().email()
})

export type UpdateEmailDTO = z.infer<typeof UpdateEmailSchema>;