import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

export interface TodosService {
  getTodos(options: { skip?: number; limit?: number }): Promise<{
    todos: { id: number; title: string }[];
    pagination: {
      skip: number;
      limit: number;
      total: number;
    };
  }>;
}

const TOTAL_TODOS = 1000;

async function todosService(app: FastifyTypebox) {
  app.addHook('onRequest', async function todosServiceHook(request) {
    request.service.todos = {
      async getTodos(options) {
        const { skip = 0, limit = 10 } = options;

        const totalTodos = TOTAL_TODOS;
        const todos = [];

        const startIndex = skip;
        const endIndex = Math.min(startIndex + limit, totalTodos);

        for (let id = startIndex + 1; id <= endIndex; id++) {
          todos.push({
            id,
            title: `ID: ${id.toString()}`,
          });
        }

        return {
          todos,
          pagination: {
            skip,
            limit,
            total: totalTodos,
          },
        };
      },
    };
  });
}

export const todosServicePlugin = fastifyPlugin(todosService, {
  name: 'todosService',
});
