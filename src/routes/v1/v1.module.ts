import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

import { examplesModulePlugin } from '@/routes/v1/examples/examples.module';

async function v1Module(app: FastifyInstance) {
  await app.register(examplesModulePlugin, {
    prefix: 'examples',
  });
}

export const v1ModulePlugin = fastifyPlugin(v1Module, {
  name: 'v1Module',
  encapsulate: true,
});
