import { fastify } from 'fastify';

import { registerErrorHandler } from '@/core/errors/error-handler';
import { registerNotFoundHandler } from '@/core/errors/not-found-handler';
import { externalModulePlugin } from '@/plugins/external/external.module';
import { routesModulePlugin } from '@/routes/routes.module';

import type { FastifyServerOptions } from 'fastify';
import type { Environment } from '@/core/environment';
import type { FastifyTypebox } from '@/types/fastify';
import type {
  FastifyPluginAsyncTypebox,
  TypeBoxTypeProvider,
} from '@fastify/type-provider-typebox';

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
  plugins,
}: {
  serverOptions?: FastifyServerOptions;
  environmentConfig: Environment;
  plugins?: FastifyPluginAsyncTypebox[];
}): Promise<FastifyTypebox> {
  const app = fastify(serverOptions ?? {}).withTypeProvider<TypeBoxTypeProvider>();

  app.decorate('secrets', environmentConfig);

  await app.register(externalModulePlugin);

  registerErrorHandler(app);
  registerNotFoundHandler(app);

  await app.register(routesModulePlugin, {
    prefix: '/',
  });

  if (plugins) {
    for (const plugin of plugins) {
      await app.register(plugin);
    }
  }

  return app;
}

export { buildApp };
