# Validation

Validation refers to sanitizing both the **request** and **response**.  
This template uses `@sinclair/typebox` to define schemas, and Fastify performs the validation internally.

If validation fails, Fastify automatically responds with a `400 Bad Request` and an appropriate error message.

## Request Validation

Let's say we want to validate the request body for a route. Here's an example:

::: code-group

```ts [create-todo.handler.ts]
import { Type } from '@sinclair/typebox';

import type { FastifyTypebox } from '@/types/fastify';

// Using `Type`, we define the body schema
const BODY_SCHEMA = Type.Object(
  {
    title: Type.String(),
    description: Type.Optional(Type.String()),
  },
  { additionalProperties: false },
);

export function createTodoHandler(app: FastifyTypebox) {
  const { service } = app;

  app.post(
    '/',
    {
      schema: {
        // Attach the schema to the Fastify route
        body: BODY_SCHEMA,
      },
    },
    async function createTodo(request, reply) {
      // request.body is now typed and validated
      const { title, description = null } = request.body;

      // logic
    },
  );
}
```

This make sure that the input is validated and typed before using in the handler `createTodo`

:::

## Response Validation

Response validation is used to sanitize the outgoing data and ensure a consistent response structure.

Let’s extend the above `create-todo.handler.ts` to include response validation:

::: code-group

```ts [create-todo.handler.ts]
import { Static, Type } from '@sinclair/typebox';

// Utility to wrap the response send by the handler
import { generateApiResponse } from '@/core/api/api-response';
// Utility to generate schema for API response
import { createApiResponseSchema } from '@/core/api/api-response.schema';

import type { FastifyTypebox } from '@/types/fastify';

const BODY_SCHEMA = // omit

export function createTodoHandler(app: FastifyTypebox) {
  const { service } = app;

  app.post(
    '/',
    {
      schema: {
        body: BODY_SCHEMA,
        response: {
          // The schema for a 201 response
          201: RESPONSE_SCHEMA,
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
          message: 'Todo created successfully',
          statusCode: RESPONSE_STATUS_CODE,
          data: null,
        },
      });
    },
  );
}

// Schema for the `data` field in the API response
const RESPONSE_DATA_SCHEMA = Type.Null();

// Create a TypeScript type from the schema using `Static`
type ResponseData = Static<typeof RESPONSE_DATA_SCHEMA>;

// Schema for the complete API response
const RESPONSE_SCHEMA = createApiResponseSchema(RESPONSE_DATA_SCHEMA);
```

:::

With this setup:

- Fastify validates incoming data using the request schema (`body`, `query`, etc.).
- Fastify validates outgoing data using the response schema per status code.

Validation is fully integrated and type-safe, making routes predictable and reliable.
