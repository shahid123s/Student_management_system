import { CorsConfig } from '../../config/corsConfig';

export class CorsService {
  constructor(private config: CorsConfig) {}

  isOriginAllowed(origin: string): boolean {
    if (this.config.allowedOrigins.includes('*')) {
      return true;
    }
    
    return this.config.allowedOrigins.includes(origin);
  }

  getCorsOptions() {
    return {
      origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
        // No origin (like same-origin requests or server-to-server)
        if (!origin) {
          return callback(null, true);
        }
        
        if (this.isOriginAllowed(origin)) {
          callback(null, true);
        } else {
          callback(new Error('CORS not allowed'), false);
        }
      },
      methods: this.config.allowedMethods,
      allowedHeaders: this.config.allowedHeaders,
      exposedHeaders: this.config.exposedHeaders,
      credentials: this.config.credentials,
      maxAge: this.config.maxAge
    };
  }
}