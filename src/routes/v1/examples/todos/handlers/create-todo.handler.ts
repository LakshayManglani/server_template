import { Static, Type } from '@sinclair/typebox';
import { StatusCodes } from 'http-status-codes';

import { generateApiResponse } from '@/core/api/api-response';
import { createApiResponseType } from '@/core/api/api-response.schema';

import type { FastifyTypebox } from '@/types/fastify';

const RESPONSE_STATUS_CODE = StatusCodes.CREATED;

export function createTodoHandler(app: FastifyTypebox) {
  const { service } = app;

  app.post(
    '/',
    {
      schema: {
        tags: ['todos'],
        summary: 'Create todo',
        description: 'Create a todo using title',
        operationId: 'createTodo',
        consumes: ['application/json'],
        body: BODY_SCHEMA,
        response: {
          [RESPONSE_STATUS_CODE]: RESPONSE_SCHEMA,
        },
      },
    },
    async function createTodo(request, reply) {
      const { title, description = null } = request.body;

      await service.todos.createTodo({
        title,
        description,
      });

      return generateApiResponse<ResponseData>({
        app,
        request,
        reply,
        response: {
          message: 'Todos created successfully',
          statusCode: RESPONSE_STATUS_CODE,
          data: null,
        },
      });
    },
  );
}

const BODY_SCHEMA = Type.Object(
  {
    title: Type.String({
      description: 'The title of the todo item. This field is required but can be an empty string.',
      examples: ['Implement todos endpoints'],
    }),
    description: Type.Optional(
      Type.String({
        description: 'An optional short description providing more details about the todo item.',
        default: null,
        examples: ['Currently only implementing create and list endpoints'],
      }),
    ),
  },
  { additionalProperties: false },
);

const RESPONSE_DATA = Type.Null();

type ResponseData = Static<typeof RESPONSE_DATA>;

const RESPONSE_SCHEMA = createApiResponseType(RESPONSE_DATA);
