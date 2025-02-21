import { z } from "zod";

export const UpdateEmailSchema = z.object({
    email: z.string().email(),
})

export type UpdateEmailDTO = z.infer<typeof UpdateEmailSchema>;