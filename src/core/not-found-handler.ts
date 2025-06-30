import { ERROR_CODES } from '@/core/errors/error-codes';

import type { FastifyInstance } from 'fastify';

export function registerNotFoundHandler(app: FastifyInstance) {
  app.setNotFoundHandler(async (request, reply) => {
    reply.code(404);

    request.log.warn(
      {
        req: request,
      },
      'Route not found',
    );

    const response = {
      success: false,
      error: {
        code: ERROR_CODES.ROUTE_NOT_FOUND,
        message: `Route ${request.method} ${request.url} not found`,
      },
      meta: {
        requestId: request.id,
        timeStamp: new Date().toISOString(),
      },
    };

    return response;
  });
}
