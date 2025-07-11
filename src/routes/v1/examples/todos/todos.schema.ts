import { Static, Type } from '@sinclair/typebox';

import { createApiResponseType } from '@/core/api/api-response.schema';

export const TODO_SCHEMA = Type.Object(
  {
    id: Type.Number({
      description: 'Unique identifier for the todo item',
      examples: [1],
    }),
    title: Type.String({
      description: 'Title or label of the todo item',
      examples: ['Buy Milk'],
    }),
  },
  {
    additionalProperties: false,
  },
);

export const TODOS_LIST_QUERY_SCHEMA = Type.Object(
  {
    skip: Type.Integer({
      description: 'Number of items to skip',
      default: 5,
      examples: [0],
    }),
    limit: Type.Integer({
      description: 'Number of items to return',
      default: 20,
      examples: [10],
    }),
  },
  { additionalProperties: false },
);

export const PAGINATION_SCHEMA = Type.Object(
  {
    skip: Type.Integer({
      description: 'Number of items to skip (for pagination)',
      examples: [0],
    }),
    limit: Type.Integer({
      description: 'Maximum number of items to return',
      examples: [10],
    }),
    total: Type.Integer({
      description: 'Total number of items available',
      examples: [42],
    }),
  },
  { additionalProperties: false },
);

export const TODOS_LIST_RESPONSE_SCHEMA = createApiResponseType(
  Type.Object(
    {
      todos: Type.Array(TODO_SCHEMA, {
        description: 'List of todo items',
      }),
      pagination: PAGINATION_SCHEMA,
    },
    {
      additionalProperties: false,
    },
  ),
);

export type TodosListResponseData = Static<typeof TODOS_LIST_RESPONSE_SCHEMA.properties.data>;
