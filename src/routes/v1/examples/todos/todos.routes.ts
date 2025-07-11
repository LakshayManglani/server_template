import { fastifyPlugin } from 'fastify-plugin';
import { StatusCodes } from 'http-status-codes';

import { generateApiResponse } from '@/core/api/api-response';
import {
  TODOS_LIST_QUERY_SCHEMA,
  TODOS_LIST_RESPONSE_SCHEMA,
  TodosListResponseData,
} from '@/routes/v1/examples/todos/todos.schema';

import type { FastifyTypebox } from '@/types/fastify';

async function todosRoutes(app: FastifyTypebox) {
  const { service } = app;

  app.get(
    '/',
    {
      schema: {
        tags: ['todos'],
        summary: 'List todos',
        description: 'Fetch a paginated list of todos with skip and limit parameters.',
        operationId: 'listTodos',
        consumes: ['application/json'],
        querystring: TODOS_LIST_QUERY_SCHEMA,
        response: {
          [StatusCodes.OK]: TODOS_LIST_RESPONSE_SCHEMA,
        },
      },
    },
    async function listTodos(request, reply) {
      const { skip, limit } = request.query;
      const { todos, pagination } = await service.todos.getTodos({
        skip,
        limit,
      });

      return generateApiResponse<TodosListResponseData>({
        app,
        request,
        reply,
        response: {
          message: 'Todos fetched successfully',
          statusCode: StatusCodes.OK,
          data: {
            todos,
            pagination,
          },
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
