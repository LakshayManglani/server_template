import { fastifyPlugin } from 'fastify-plugin';

import { examplesModulePlugin } from '@/routes/v1/examples/examples.module';

import type { FastifyTypebox } from '@/types/fastify';

async function v1Module(app: FastifyTypebox) {
  await app.register(examplesModulePlugin, {
    prefix: 'examples',
  });
}

export const v1ModulePlugin = fastifyPlugin(v1Module, {
  name: 'v1Module',
  encapsulate: true,
});
