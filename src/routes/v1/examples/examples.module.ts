import { fastifyPlugin } from 'fastify-plugin';

import { todosModulePlugin } from '@/routes/v1/examples/todos/todos.module';

import type { FastifyTypebox } from '@/types/fastify';

async function examplesModule(app: FastifyTypebox) {
  await app.register(todosModulePlugin, {
    prefix: 'todos',
  });
}

export const examplesModulePlugin = fastifyPlugin(examplesModule, {
  name: 'examplesModule',
  encapsulate: true,
});
