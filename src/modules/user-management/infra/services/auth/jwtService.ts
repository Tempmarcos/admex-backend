import jwt from 'jsonwebtoken';
import { env } from '../../../../../env';
import { AuthInterface } from './authInterface';

export class JWTService implements AuthInterface{
     async sign(payload: object): Promise<string> {
        const secret : string= env.JWT_SECRET;
        const expiration : any= env.EXPIRES;
        
        // console.log(secret + ' ' + expiration)

        const token = jwt.sign(payload, secret, {expiresIn: expiration});

        // console.log(token)
        return token
    }

    async verify(token: string): Promise<jwt.JwtPayload | null> {
        try{
            return await jwt.verify(token, env.JWT_SECRET) as jwt.JwtPayload;
        }catch (error) {
            return null;
          }
    }
}