import { fastify } from 'fastify';

import { registerErrorHandler } from '@/core/error-handler';
import { registerNotFoundHandler } from '@/core/not-found-handler';
import { externalModulePlugin } from '@/plugins/external/external.module';

import type { FastifyInstance, FastifyServerOptions } from 'fastify';
import type { Environment } from '@/core/environment';

/**
 * Use this function to create a Fastify server with custom options,
 * suitable for both production usage and automated testing environments.
 *
 * ## Example
 * ```ts
 * const app = await buildApp();
 * await app.listen({ port: 8080, host: "0.0.0.0" });
 * ```
 */
async function buildApp({
  serverOptions,
  environmentConfig,
}: {
  serverOptions?: FastifyServerOptions;
  environmentConfig: Environment;
}): Promise<FastifyInstance> {
  const app = fastify(serverOptions ?? {});

  app.decorate('secrets', environmentConfig);

  await app.register(externalModulePlugin);

  app.get('/health', async function getServerHealth() {
    return {};
  });

  registerErrorHandler(app);
  registerNotFoundHandler(app);

  return app;
}

export { buildApp };
