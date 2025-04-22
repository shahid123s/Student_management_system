import { IAppConfig } from "../infrastructure/config/config.interface";
import dotenv from 'dotenv';
dotenv.config();

export  const appConfig : IAppConfig = {
    app: {
        port: Number(process.env.APP_PORT )|| 3009,
        environment: process.env.APP_ENVIRONMENT || 'development'
    },
    cors: {
        origin: process.env.CORS_ORIGIN || '*'
    },
    db : {
        uri: process.env.DB_URI || 'mongodb://localhost:27017/SMS'
    },
    jwt: {
        accessSecret: process.env.ACCESS_TOKEN_SECRET  || 'accessSecret',
        accessExpiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN as string || '1h',
        refreshSecret: process.env.REFRESH_TOKEN_SECRET || 'refreshSecret',
        refreshExpiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || '7d'
    }
}