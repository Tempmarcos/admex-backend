import { GetUserDTO } from "../user/GetUserDTO";




export type LoginResponseDTO = GetUserDTO & {
    token: string
}