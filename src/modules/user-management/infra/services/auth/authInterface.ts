import { JwtPayload } from "jsonwebtoken"


export interface AuthInterface {
    sign(payload: object | object | Buffer): Promise<string>
    verify(token: string): Promise<object | JwtPayload | null>
}