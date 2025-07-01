import { ERROR_CODES } from '@/core/errors/error-codes';

import type { FastifyInstance } from 'fastify';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(async function errorHandler(error, request, reply) {
    const isDevelopment = app.secrets.APP_ENV === 'development';

    const statusCode = error.statusCode ?? 500;
    const code = resolveErrorCode(error.code);
    const message = resolveErrorMessage(error.message);

    const { stack } = error;

    reply.code(statusCode);

    request.log.error(
      {
        req: request,
        res: reply,
        err: error,
      },
      `[${code}] ${message}`,
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

function resolveErrorCode(code: string | undefined) {
  if (code?.trim().length) {
    return code;
  }

  return ERROR_CODES.INTERNAL_SERVER_ERROR;
}

function resolveErrorMessage(message: string | undefined) {
  if (message?.trim().length) {
    return message;
  }

  return 'Unhandled error occurred';
}
