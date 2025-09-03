import { z } from "zod";


export const UpdatePermissionsInputZod = z.object({
    permissoes: z.string().array(),
    admin: z.boolean().default(false)
})

export type UpdatePermissionsInputDTO = z.infer<typeof UpdatePermissionsInputZod>;