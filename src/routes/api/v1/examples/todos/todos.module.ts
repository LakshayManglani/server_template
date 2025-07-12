import { fastifyPlugin } from 'fastify-plugin';

import { todosRoutesPlugin } from '@/routes/api/v1/examples/todos/todos.routes';
import { todosServicePlugin } from '@/services/todos/todos.service';

import type { FastifyTypebox } from '@/types/fastify';

async function todosModuleLoader(app: FastifyTypebox) {
  await app.register(todosServicePlugin);
  await app.register(todosRoutesPlugin);
}

export const todosModulePlugin = fastifyPlugin(todosModuleLoader, {
  name: 'todosModule',
  encapsulate: true,
});
