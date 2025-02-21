export interface AuthInterface {
    sign(payload: object | Buffer, expiration : string): Promise<string>
    verify(token: any): Promise<any | null>
}