import jwt from 'jsonwebtoken';
import { env } from '../../../../../env';

export class JWTService {

    static sign(payload: object): string {
        const secret : string= env.JWT_SECRET;
        const expiration : any= env.EXPIRES;
        
        return jwt.sign(payload, secret, {expiresIn: expiration})
    }

    static verify(token: string): jwt.JwtPayload | null {
        try{
            return jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
        }catch (error) {
            return null;
          }
    }
}