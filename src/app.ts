import Fastify from 'fastify';

import type { Environment } from '@/configs/environment';
import type { FastifyInstance, FastifyServerOptions } from 'fastify';

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
  const app = Fastify(serverOptions ?? {});

  app.decorate('secrets', environmentConfig);

  app.get('/health', async () => {
    return {};
  });

  return app;
}

export { buildApp };
