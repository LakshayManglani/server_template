import { buildTestApp } from 'test/helper';
import { describe, expect, it } from 'vitest';

describe('GET /not-found-url', () => {
  it('should return 404', async () => {
    const app = await buildTestApp();

    const response = await app.inject({
      method: 'GET',
      url: '/not-found-url',
    });

    expect(response.statusCode).toBe(404);
    expect(response.headers['content-type']).toMatch('application/json');

    expect(response.json()).toMatchObject({
      success: false,
      error: {
        code: 'ROUTE.NOT_FOUND',
        message: 'Route GET /not-found-url not found',
      },
    });

    await app.close();
  });
});
