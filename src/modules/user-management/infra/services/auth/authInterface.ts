

export interface AuthInterface {
    sign(payload: object): Promise<string | null>
    verify(token: string): Promise<string | null>
}