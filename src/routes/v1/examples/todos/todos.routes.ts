import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';
import { StatusCodes } from 'http-status-codes';

import { generateApiResponse } from '@/core/api-response';

async function todosRoutes(app: FastifyInstance) {
  app.get('/', {}, async function listTodos(request, reply) {
    const { totalCount, todos } = await request.service.todos.getTodos();

    return generateApiResponse(request, reply, {
      message: 'Todos fetched successfully',
      statusCode: StatusCodes.OK,
      data: {
        totalCount,
        todos,
      },
    });
  });
}

export const todosRoutesPlugin = fastifyPlugin(todosRoutes, {
  encapsulate: true,
  name: 'todosRoutes',
  dependencies: ['todosService'],
});
