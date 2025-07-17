import { buildTestApp } from 'test/helper';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { ERROR_CODES } from '@/core/errors/error-codes';

import type { InjectOptions } from 'fastify';
import type { FastifyTypebox } from '@/types/fastify';

const url = '/not-found-url';
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

  it('should return 404', async () => {
    const response = await app.inject(apiOptions);

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch('application/json');

    expect(response.json()).toMatchObject({
      success: false,
      error: {
        code: 'ROUTE.NOT_FOUND',
        message: 'Route GET /not-found-url not found',
      },
    });
  });

  it('should return 429 after too many requests', async () => {
    for (let index = 0; index < 10; index++) {
      await app.inject(apiOptions);
    }

    const response = await app.inject(apiOptions);

    expect(response.statusCode).toBe(429);
    expect(response.headers['content-type']).toMatch('application/json');

    expect(response.json()).toMatchObject({
      success: false,
      error: {
        code: ERROR_CODES.RATE_LIMIT_EXCEEDED,
      },
    });
  });
});
