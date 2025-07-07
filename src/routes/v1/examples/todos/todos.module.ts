import { fastifyPlugin } from 'fastify-plugin';

import { todosRoutesPlugin } from '@/routes/v1/examples/todos/todos.routes';
import { todosServicePlugin } from '@/services/todos/todos.service';

import type { FastifyTypebox } from '@/types/fastify';

async function todosModule(app: FastifyTypebox) {
  await app.register(todosServicePlugin);
  await app.register(todosRoutesPlugin);
}

export const todosModulePlugin = fastifyPlugin(todosModule, {
  name: 'todosModule',
  encapsulate: true,
});
