import { buildTestApp } from 'test/helper';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import type { InjectOptions } from 'fastify';
import type { ErrorResponse } from '@/core/errors/app-error';
import type { FastifyTypebox } from '@/types/fastify';

const url = '/health';
const method = 'GET';
const apiOptions: InjectOptions = {
  url,
  method,
};

describe(`${method} ${url}`, () => {
  let app: FastifyTypebox;

  beforeAll(async () => {
    app = await buildTestApp({
      environmentSchemaOptions: {
        data: {
          RATE_LIMIT_MAX: 5,
        },
      },
    });
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return 429 when rate-limit is reached', async () => {
    for (let index = 0; index < app.secrets.RATE_LIMIT_MAX; index++) {
      await app.inject(apiOptions);
    }

    const response = await app.inject(apiOptions);

    expect(response.statusCode).toBe(429);
    expect(response.headers['content-type']).toMatch('application/json');

    const body = response.json<ErrorResponse>();
    expect(body.success).toBe(false);
  });
});
