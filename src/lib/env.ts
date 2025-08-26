import 'dotenv/config';
import { z } from 'zod';

const Env = z.object({
      NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
      PORT: z.string().default('3000'),

      // Supabase
      SUPABASE_URL: z.string().url(),
      SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
      SUPABSE_SECRET_KEY: z.string().min(1),

      // Logging
      LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
            .default(process.env.NODE_ENV === 'production' ? 'info' : 'debug')
});

export const env = Env.parse(process.env);

export const isProd = env.NODE_ENV === 'prod';
export const isDev = env.NODE_ENV === 'dev';
