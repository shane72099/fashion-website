import { cleanEnv, str, port, url } from 'envalid';

export function validateEnv() {
  return cleanEnv(process.env, {
    NODE_ENV: str({ choices: ['development', 'test', 'production'] }),
    PORT: port({ default: 5001 }),
    MONGODB_URI: url(),
    JWT_SECRET: str(),
    CORS_ORIGIN: str(),
    
    // Optional variables
    STRIPE_SECRET_KEY: str({ default: undefined }),
    STRIPE_WEBHOOK_SECRET: str({ default: undefined }),
    PAYPAL_CLIENT_ID: str({ default: undefined }),
    PAYPAL_CLIENT_SECRET: str({ default: undefined }),
  });
}

// Export environment type
export type Env = ReturnType<typeof validateEnv>; 