import { fastifyPlugin } from 'fastify-plugin';

import { createTodoHandler } from '@/routes/api/v1/examples/todos/handlers/create-todo.handler';
import { listTodosHandler } from '@/routes/api/v1/examples/todos/handlers/list-todos.handler';

import type { FastifyTypebox } from '@/types/fastify';

async function todosRoutes(app: FastifyTypebox) {
  listTodosHandler(app);

  createTodoHandler(app);
}

export const todosRoutesPlugin = fastifyPlugin(todosRoutes, {
  encapsulate: true,
  name: 'todosRoutes',
  dependencies: ['todosService'],
});
