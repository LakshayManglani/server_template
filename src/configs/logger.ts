import type { Environment } from '@/core/environment';
import type { FastifyServerOptions } from 'fastify';

export function getLoggerConfig({
  appEnvironment,
  logLevel,
}: {
  appEnvironment: Environment['APP_ENV'];
  logLevel: Environment['LOG_LEVEL'];
}): NonNullable<FastifyServerOptions['logger']> {
  if (appEnvironment === 'development') {
    return {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss:ms',
          ignore: 'pid,hostname',
        },
      },
      level: logLevel,
    };
  }

  return { level: logLevel };
}
