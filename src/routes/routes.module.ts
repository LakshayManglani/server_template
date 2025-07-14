import { fastifyPlugin } from 'fastify-plugin';

import { apiModulePlugin } from '@/routes/api/api.module';
import { internalModulePlugin } from '@/routes/internal/internal.module';

import type { FastifyTypebox } from '@/types/fastify';

async function routesModuleLoader(app: FastifyTypebox) {
  await app.register(internalModulePlugin, {
    prefix: '/',
  });

  await app.register(apiModulePlugin, {
    prefix: '/api',
  });
}

export const routesModulePlugin = fastifyPlugin(routesModuleLoader, {
  name: 'routesModule',
  encapsulate: true,
});
