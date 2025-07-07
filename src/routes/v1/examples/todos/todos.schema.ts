import { Type } from '@sinclair/typebox';

import { createApiResponseType } from '@/core/api/api-response.schema';

export const TODO_SCHEMA = Type.Object({
  id: Type.Number(),
  title: Type.String(),
});

export const PAGINATION_SCHEMA = Type.Object({
  skip: Type.Number(),
  limit: Type.Number(),
  total: Type.Number(),
});

export const TODOS_LIST_QUERY_SCHEMA = Type.Object({
  skip: Type.Integer({
    default: 0,
  }),
  limit: Type.Integer({
    default: 10,
  }),
});

export const TODOS_LIST_RESPONSE_SCHEMA = createApiResponseType(
  Type.Object({
    todos: Type.Array(TODO_SCHEMA),
    pagination: PAGINATION_SCHEMA,
  }),
);
