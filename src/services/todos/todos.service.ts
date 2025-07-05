import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

export interface TodosService {
  getTodos(): Promise<{ totalCount: number; todos: { id: number; title: string }[] }>;
}

async function todosService(app: FastifyInstance) {
  app.addHook('onRequest', async function todosServiceHook(request) {
    request.service.todos = {
      async getTodos() {
        const totalCount = 4;
        const todos = [];

        for (let id = 0; id < totalCount; id++) {
          todos.push({
            id,
            title: `ID: ${id.toString()}`,
          });
        }

        return {
          totalCount,
          todos,
        };
      },
    };
  });
}

export const todosServicePlugin = fastifyPlugin(todosService, {
  name: 'todosService',
});
