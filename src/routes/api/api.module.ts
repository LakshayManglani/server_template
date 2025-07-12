import { fastifyPlugin } from 'fastify-plugin';

import { v1ModulePlugin } from '@/routes/api/v1/v1.module';

import type { FastifyTypebox } from '@/types/fastify';

async function apiModuleLoader(app: FastifyTypebox) {
  await app.register(v1ModulePlugin, {
    prefix: 'v1',
  });
}

export const apiModulePlugin = fastifyPlugin(apiModuleLoader, {
  name: 'apiModule',
  encapsulate: true,
});
