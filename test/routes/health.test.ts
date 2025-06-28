import { buildTestApp } from 'test/helper';
import { describe, expect, it } from 'vitest';

describe('GET /health', () => {
  it('should return 200 with empty body', async () => {
    const app = await buildTestApp();

    const response = await app.inject({
      method: 'GET',
      url: '/health',
    });

    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch('application/json');
    expect(response.body).toBe('{}');

    await app.close();
  });
});
