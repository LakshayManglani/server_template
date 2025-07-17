import { InjectOptions } from 'fastify';
import { buildTestApp } from 'test/helper';
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest';

import { ListTodosResponseSchema } from '@/routes/api/v1/examples/todos/handlers/list-todos.handler';
import { FastifyTypebox } from '@/types/fastify';

const url = '/api/v1/examples/todos';
const method = 'GET';
const apiOptions: InjectOptions = {
  url,
  method,
};

describe(`${method} ${url}`, () => {
  let app: FastifyTypebox;

  beforeAll(async () => {
    app = await buildTestApp();
  });

  afterAll(async () => {
    await app.close();
  });

  test('should return 200 with empty list when no todos exist', async () => {
    await app.prisma.todo.deleteMany();

    const response = await app.inject(apiOptions);

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');

    const body = response.json<ListTodosResponseSchema>();
    expect(body.success).toBe(true);
    expect(body.data.todos).toHaveLength(0);
  });

  describe('basic test', () => {
    beforeEach(async () => {
      await app.prisma.todo.deleteMany();
    });

    test('should return 200 with list when todos exist', async () => {
      await seedTodos(app, 4);

      const response = await app.inject(apiOptions);
      expect(response.statusCode).toBe(200);

      const body = response.json<ListTodosResponseSchema>();
      expect(body.success).toBe(true);
      expect(body.data.todos).toHaveLength(4);
    });

    test('should return todos in expected shape', async () => {
      const todos = await seedTodos(app, 4);

      const response = await app.inject(apiOptions);
      expect(response.statusCode).toBe(200);

      const body = response.json<ListTodosResponseSchema>();
      expect(body.success).toBe(true);
      expect(body.data.todos[0]).toMatchObject({ ...todos[0], isCompleted: false });
      expect(body.data.todos[1]).toMatchObject({ ...todos[1], isCompleted: false });
    });
  });

  describe.concurrent('pagination test', () => {
    beforeAll(async () => {
      await app.prisma.todo.deleteMany();
      await seedTodos(app, 4);
    });

    const testCases = [
      { name: 'no skip or limit', query: {}, expectedLength: 4 },
      { name: 'limit=2', query: { limit: '2' }, expectedLength: 2 },
      { name: 'skip=2', query: { skip: '2' }, expectedLength: 2 },
      { name: 'skip=1, limit=2', query: { skip: '1', limit: '2' }, expectedLength: 2 },
      { name: 'limit=0', query: { limit: '0' }, expectedLength: 0 },
      { name: 'skip=10', query: { skip: '10' }, expectedLength: 0 },
    ];

    for (const testOptions of testCases) {
      const { expectedLength, name, query } = testOptions;

      test(`should return ${expectedLength.toString()} todos when ${name}`, async () => {
        const response = await app.inject({ ...apiOptions, query });

        const body = response.json<ListTodosResponseSchema>();
        expect(response.statusCode).toBe(200);
        expect(body.success).toBe(true);
        expect(body.data.todos).toHaveLength(expectedLength);
      });
    }
  });
});

async function seedTodos(app: FastifyTypebox, total = 4) {
  const todos = [];
  for (let index = 0; index < total; index++) {
    const indexString = index.toString();
    todos.push({
      title: `title ${indexString}`,
      ...(index % 2 === 0 && { description: `description ${indexString}` }),
    });
  }

  await app.prisma.todo.createMany({ data: todos });

  return todos;
}
