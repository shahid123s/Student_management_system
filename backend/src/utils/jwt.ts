import { sign, verify } from 'jsonwebtoken'
import { appConfig } from '../config/appConfig';
import { pasreExpiresIn } from './parseExpiresIn';
const {accessExpiresIn, accessSecret, refreshExpiresIn, refreshSecret} = appConfig.jwt



interface IJwtPayload {
    userId: string;
    role: string;
}



export const generateAccessToken = async (data: IJwtPayload): Promise<string> => {
    return sign(data, accessSecret, { expiresIn: pasreExpiresIn(accessExpiresIn)});
  };

export const generateRefreshToken = async (data: IJwtPayload): Promise<string> => {
    return sign(data, refreshSecret, { expiresIn: pasreExpiresIn(refreshExpiresIn)});
}

export const decodeAccessToken = async (token: string): Promise<IJwtPayload | null> => {
    try {
        const decoded = verify(token, accessSecret) as IJwtPayload;
        return decoded;
    } catch (error) {
        console.log(error)
        return null;
    }

}

export const decodeRefreshToken = async (token: string): Promise<IJwtPayload | null> => {
    try {
        const decoded = verify(token, refreshSecret) as IJwtPayload;
        return decoded;
    } catch (error) {
        console.log(error)
        return null;
    }
}   