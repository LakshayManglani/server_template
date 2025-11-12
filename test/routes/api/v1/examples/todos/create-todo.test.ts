import { buildTestApp } from 'test/helper';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import type { InjectOptions } from 'fastify';
import type { ApiErrorResponse } from '@/core/api/api-error';
import type { CreateTodoResponseSchema } from '@/routes/api/v1/examples/todos/handlers/create-todo.handler';
import type { FastifyTypebox } from '@/types/fastify';

const url = '/api/v1/examples/todos';
const method = 'POST';
const apiOptions: InjectOptions = {
  url,
  method,
};

describe(`${method} ${url}`, () => {
  let app: FastifyTypebox;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  beforeEach(async () => {
    await app.prisma.todo.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 201 when title="test title"', async () => {
    const title = 'test title';
    const response = await app.inject({
      ...apiOptions,
      body: {
        title,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toMatch('application/json');

    const body = response.json<CreateTodoResponseSchema>();
    expect(body.success).toBe(true);
    expect(body.data).toBe(null);
  });

  it('should return 201 with when title=""', async () => {
    const title = '';
    const response = await app.inject({
      ...apiOptions,
      body: {
        title,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toMatch('application/json');

    const body = response.json<CreateTodoResponseSchema>();
    expect(body.success).toBe(true);
    expect(body.data).toBe(null);
  });

  it('should return 201 when title and description are given', async () => {
    const title = 'todo title';
    const description = 'todo description';
    const response = await app.inject({
      ...apiOptions,
      body: {
        title,
        description,
      },
    });

    expect(response.statusCode).toBe(201);
    expect(response.headers['content-type']).toMatch('application/json');

    const body = response.json<CreateTodoResponseSchema>();
    expect(body.success).toBe(true);
    expect(body.data).toBe(null);
  });

  it('should return 400 when title is not given', async () => {
    const response = await app.inject({
      ...apiOptions,
      body: {},
    });

    expect(response.statusCode).toBe(400);
    expect(response.headers['content-type']).toMatch('application/json');

    const body = response.json<ApiErrorResponse>();
    expect(body.success).toBe(false);
  });
});
