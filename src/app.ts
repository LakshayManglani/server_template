import { fastify } from 'fastify';

import { registerErrorHandler } from '@/core/error-handler';
import { registerNotFoundHandler } from '@/core/not-found-handler';
import { externalModulePlugin } from '@/plugins/external/external.module';
import { routesModulePlugin } from '@/routes/routes.module';

import type { FastifyServerOptions } from 'fastify';
import type { Environment } from '@/core/environment';
import type { FastifyTypebox } from '@/types/fastify';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

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
}): Promise<FastifyTypebox> {
  const app = fastify(serverOptions ?? {}).withTypeProvider<TypeBoxTypeProvider>();

  app.decorate('secrets', environmentConfig);

  await app.register(externalModulePlugin);

  registerErrorHandler(app);
  registerNotFoundHandler(app);

  app.get(
    '/health',
    {
      schema: {
        tags: ['internal'],
        summary: 'Health check',
        description: 'Check if the server is running.',
        operationId: 'getHealth',
        response: {
          200: {
            description: 'Server is healthy',
            type: 'object',
            properties: {},
          },
        },
      },
    },
    async function getServerHealth() {
      return {};
    },
  );

  await app.register(routesModulePlugin, {
    prefix: 'api',
  });

  return app;
}

export { buildApp };
