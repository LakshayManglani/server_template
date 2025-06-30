import { ERROR_CODES } from '@/core/errors/error-codes';

import type { FastifyInstance } from 'fastify';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(async function errorHandler(error, request, reply) {
    const isDevelopment = app.secrets.APP_ENV === 'development';

    const statusCode = error.statusCode ?? 500;
    const code = error.code.trim().length > 0 ? error.code : ERROR_CODES.INTERNAL_SERVER_ERROR;
    const message = error.message.trim().length > 0 ? error.message : 'Unhandled error occurred';

    const { stack } = error;

    reply.code(statusCode);

    request.log.error(
      {
        req: request,
        res: reply,
        err: error,
      },
      message,
    );

    const response = {
      success: false,
      error: {
        code,
        message,
        ...(isDevelopment && stack && { stack }),
      },
      meta: {
        requestId: request.id,
        timeStamp: new Date().toISOString(),
      },
    };

    return response;
  });
}
