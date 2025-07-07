import { fastifyPlugin } from 'fastify-plugin';
import { StatusCodes } from 'http-status-codes';

import { generateApiResponse } from '@/core/api/api-response';
import {
  TODOS_LIST_QUERY_SCHEMA,
  TODOS_LIST_RESPONSE_SCHEMA,
} from '@/routes/v1/examples/todos/todos.schema';

import type { FastifyTypebox } from '@/types/fastify';

async function todosRoutes(app: FastifyTypebox) {
  app.get(
    '/',
    {
      schema: {
        querystring: TODOS_LIST_QUERY_SCHEMA,
        response: {
          200: TODOS_LIST_RESPONSE_SCHEMA,
        },
      },
    },
    async function listTodos(request, reply) {
      const { skip, limit } = request.query;
      const { todos, pagination } = await request.service.todos.getTodos({
        skip,
        limit,
      });

      return generateApiResponse(request, reply, {
        message: 'Todos fetched successfully',
        statusCode: StatusCodes.OK,
        data: {
          todos,
          pagination,
        },
      });
    },
  );
}

export const todosRoutesPlugin = fastifyPlugin(todosRoutes, {
  encapsulate: true,
  name: 'todosRoutes',
  dependencies: ['todosService'],
});
