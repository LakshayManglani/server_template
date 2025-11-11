import { ERROR_CODES } from '@/core/errors/error-codes';
import { getTimestamp } from '@/core/utilities';

import type { ApiErrorResponse } from '@/core/api/api-error';
import type { FastifyTypebox } from '@/types/fastify';

function registerNotFoundHandler(app: FastifyTypebox) {
  app.setNotFoundHandler(
    {
      preHandler: app.rateLimit({
        max: 10,
        timeWindow: 60_000,
      }),
    },
    async (request, reply) => {
      const { APP_ENV } = app.secrets;
      reply.code(404);

      request.log.warn(
        {
          req: request,
        },
        `[${ERROR_CODES.ROUTE_NOT_FOUND}] Route not found`,
      );

      const response: ApiErrorResponse = {
        success: false,
        error: {
          code: ERROR_CODES.ROUTE_NOT_FOUND,
          message: `Route ${request.method} ${request.url} not found`,
        },
        meta: {
          requestId: request.id,
          timeStamp: getTimestamp(APP_ENV),
        },
      };

      return response;
    },
  );
}

export { registerNotFoundHandler };
