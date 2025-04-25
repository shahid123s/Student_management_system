export interface CorsConfig {
    allowedOrigins: string[];
    allowedMethods: string[];
    allowedHeaders: string[];
    exposedHeaders: string[];
    credentials: boolean;
    maxAge: number;
  }
  
  export const loadCorsConfig = (): CorsConfig => {
    return {
      allowedOrigins: process.env.ALLOWED_ORIGINS?.split(',') || ['*'],
      allowedMethods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
      exposedHeaders: ['Content-Length', 'X-Request-Id'],
      credentials: true,
      maxAge: 86400 // 24 hours
    };
  };