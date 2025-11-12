import { ajvFilePlugin } from '@fastify/multipart';

import { getLoggerConfig } from '@/configs/logger.config';

import type { FastifyListenOptions, FastifyServerOptions } from 'fastify';
import type { Environment } from '@/core/environment';

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
        plugins: [ajvFilePlugin],
      },
    },
    listenOptions: {
      host: HOST,
      port: PORT,
    },
  };
}
