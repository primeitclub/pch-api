import 'dotenv/config';
import { z } from 'zod';

const Env = z.object({
      NODE_ENV: z.enum(['dev', 'test', 'prod']).default('dev'),
      PORT: z.string().default('3000'),
      BASE_URL: z.url().default('http://localhost:3000'),
      // Supabase
      SUPABASE_URL: z.url(),
      SUPABASE_PUBLISHABLE_KEY: z.string().min(1),
      SUPABASE_SECRET_KEY: z.string().min(1),
      BUCKET_NAME: z.string().min(1),
      FOLDER_NAME: z.string().min(1),
      // Logging
      LOG_LEVEL: z.enum(['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'])
            .default(process.env.NODE_ENV === 'production' ? 'info' : 'debug'),

      // Mail
      EMAIL_USER: z.string().min(1),
      EMAIL_PASS: z.string().min(1),
      EMAIL_TO: z.string().min(1),

      // Cron
      CRON_TIME: z.string().min(1),
});

export const env = Env.parse(process.env);

export const isProd = env.NODE_ENV === 'prod';
export const isDev = env.NODE_ENV === 'dev';
