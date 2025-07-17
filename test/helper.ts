import { buildApp } from '@/app';
import { getFastifyServerConfig } from '@/configs/server.config';
import { loadEnvironmentConfig } from '@/core/environment';

import type { EnvSchemaOpt } from 'env-schema';
import type { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';

export async function buildTestApp(
  options: { environmentSchemaOptions?: EnvSchemaOpt; plugins?: FastifyPluginAsyncTypebox[] } = {},
) {
  const { environmentSchemaOptions, plugins = [] } = options;
  const environmentConfig = loadEnvironmentConfig(environmentSchemaOptions);
  const { serverOptions } = getFastifyServerConfig({ environmentConfig });

  const app = await buildApp({
    environmentConfig,
    serverOptions,
    plugins,
  });

  await app.ready();

  return app;
}
