import { ERROR_CODES } from '@/core/errors/error-codes';

import type { FastifyTypebox } from '@/types/fastify';

export function registerNotFoundHandler(app: FastifyTypebox) {
  app.setNotFoundHandler(
    {
      preHandler: app.rateLimit({
        max: 10,
        timeWindow: 60_000,
      }),
    },
    async (request, reply) => {
      reply.code(404);

      request.log.warn(
        {
          req: request,
        },
        `[${ERROR_CODES.ROUTE_NOT_FOUND}] Route not found`,
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
    },
  );
}
