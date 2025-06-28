import { getLoggerConfig } from '@/configs/logger';

import type { Environment } from '@/configs/environment';
import type { FastifyListenOptions, FastifyServerOptions } from 'fastify';

export function getFastifyServerConfig(options: { environmentConfig: Environment }): {
  serverOptions: FastifyServerOptions;
  listenOptions: FastifyListenOptions;
} {
  const { environmentConfig } = options;
  const { APP_ENV, LOG_LEVEL, HOST, PORT } = environmentConfig;

  const logger = getLoggerConfig({
    appEnvironment: APP_ENV,
    logLevel: LOG_LEVEL,
  });

  return {
    serverOptions: {
      logger,
      ignoreTrailingSlash: true,
      ajv: {
        customOptions: {
          removeAdditional: true,
        },
      },
    },
    listenOptions: {
      host: HOST,
      port: PORT,
    },
  };
}
