import { Static, Type } from '@sinclair/typebox';
import { StatusCodes } from 'http-status-codes';

import { generateApiResponse } from '@/core/api/api-response';
import { createApiResponseSchema } from '@/core/api/api-response.schema';

import type { FastifyTypebox } from '@/types/fastify';

const RESPONSE_STATUS_CODE = StatusCodes.OK;
const SKIP_DEFAULT = 0;
const LIMIT_DEFAULT = 20;

export function listTodosHandler(app: FastifyTypebox) {
  const { service } = app;

  app.get(
    '/',
    {
      schema: {
        tags: ['todos'],
        summary: 'List todos',
        description:
          'Fetch a paginated list of todos with skip and limit parameters. Ordered by createdAt descending.',
        operationId: 'listTodos',
        consumes: ['application/json'],
        querystring: QUERY_SCHEMA,
        response: {
          [RESPONSE_STATUS_CODE]: RESPONSE_SCHEMA,
        },
      },
    },
    async function listTodos(request, reply) {
      const { skip = SKIP_DEFAULT, limit = LIMIT_DEFAULT } = request.query;
      const { todos: rawTodos, pagination } = await service.todos.getTodos({
        skip,
        limit,
      });

      const todos = rawTodos.map((todo) => {
        const { createdAt, description, id, isCompleted, title } = todo;

        return {
          description,
          id,
          isCompleted,
          title,
          createdAt: createdAt.toISOString(),
        };
      });

      return generateApiResponse<ResponseData>({
        app,
        request,
        reply,
        response: {
          message: 'Todos fetched successfully',
          statusCode: RESPONSE_STATUS_CODE,
          data: {
            todos,
            pagination,
          },
        },
      });
    },
  );
}

const QUERY_SCHEMA = Type.Object(
  {
    skip: Type.Optional(
      Type.Integer({
        description: 'Number of items to skip',
        default: SKIP_DEFAULT,
        examples: [SKIP_DEFAULT],
      }),
    ),
    limit: Type.Optional(
      Type.Integer({
        description: 'Number of items to return',
        default: LIMIT_DEFAULT,
        examples: [LIMIT_DEFAULT],
      }),
    ),
  },
  { additionalProperties: false },
);

const RESPONSE_DATA_SCHEMA = Type.Object(
  {
    todos: Type.Array(
      Type.Object({
        id: Type.Number({
          description: 'Unique identifier for the todo item',
          examples: [1],
        }),
        title: Type.String({
          description:
            'The title of the todo item. This field is required but can be an empty string.',
          examples: ['Implement todos endpoints'],
        }),
        description: Type.Union([
          Type.String({
            description:
              'An short description providing more details about the todo item. Can be null',
            examples: ['Currently only implementing create and list endpoints'],
          }),
          Type.Null(),
        ]),
        isCompleted: Type.Boolean(),
        createdAt: Type.String({
          format: 'date-time',
          description: 'ISO timestamp of when todo was created',
          examples: ['2025-07-12T15:30:00.000Z'],
        }),
      }),
      {
        description: 'List of todo items',
      },
    ),
    pagination: Type.Object({
      skip: Type.Integer({
        description: 'Number of items to skip (for pagination)',
        examples: [SKIP_DEFAULT],
      }),
      limit: Type.Integer({
        description: 'Maximum number of items to return',
        examples: [LIMIT_DEFAULT],
      }),
      total: Type.Integer({
        description: 'Total number of items available',
        examples: [42],
      }),
    }),
  },
  {
    additionalProperties: false,
  },
);

type ResponseData = Static<typeof RESPONSE_DATA_SCHEMA>;

const RESPONSE_SCHEMA = createApiResponseSchema(RESPONSE_DATA_SCHEMA);

export type ListTodosResponseSchema = Static<typeof RESPONSE_SCHEMA>;
