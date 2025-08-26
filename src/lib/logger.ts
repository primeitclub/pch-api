import pino from "pino";
import { env, isProd } from "./env";

export const logger = pino({
      level: env.LOG_LEVEL,
      transport: !isProd ? {
            target: "pino-pretty",
            options: {
                  colorize: true,
                  ignore: "pid,hostname",
            },
      } : undefined,
});

