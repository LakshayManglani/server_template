import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

import { todosModulePlugin } from '@/routes/v1/examples/todos/todos.module';

async function examplesModule(app: FastifyInstance) {
  await app.register(todosModulePlugin, {
    prefix: 'todos',
  });
}

export const examplesModulePlugin = fastifyPlugin(examplesModule, {
  name: 'examplesModule',
  encapsulate: true,
});
