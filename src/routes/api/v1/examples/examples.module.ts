import { fastifyPlugin } from 'fastify-plugin';

import { todosModulePlugin } from '@/routes/api/v1/examples/todos/todos.module';

import type { FastifyTypebox } from '@/types/fastify';

async function examplesModuleLoader(app: FastifyTypebox) {
  await app.register(todosModulePlugin, {
    prefix: '/todos',
  });
}

export const examplesModulePlugin = fastifyPlugin(examplesModuleLoader, {
  name: 'examplesModule',
  encapsulate: true,
});
