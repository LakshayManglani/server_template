import { fastifyPlugin } from 'fastify-plugin';

import { examplesModulePlugin } from '@/routes/api/v1/examples/examples.module';

import type { FastifyTypebox } from '@/types/fastify';

async function v1ModuleLoader(app: FastifyTypebox) {
  await app.register(examplesModulePlugin, {
    prefix: '/examples',
  });
}

export const v1ModulePlugin = fastifyPlugin(v1ModuleLoader, {
  name: 'v1Module',
  encapsulate: true,
});
