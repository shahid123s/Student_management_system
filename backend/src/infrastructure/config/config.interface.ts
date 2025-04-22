 
export interface  IAppConfig { 
    app: {
        port : number;
        environment: string;    
    },
    db: {
        uri: string;
    },
    cors: {
        origin: string;
    },
    jwt: {
        accessSecret: string;
        accessExpiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    },

}