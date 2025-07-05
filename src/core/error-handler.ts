import { getStatusCode, ReasonPhrases, StatusCodes } from 'http-status-codes';

import { ERROR_CODES } from '@/core/errors/error-codes';

import type { FastifyInstance } from 'fastify';

export function registerErrorHandler(app: FastifyInstance) {
  app.setErrorHandler(async function errorHandler(error, request, reply) {
    const isDevelopment = app.secrets.APP_ENV === 'development';

    const statusCode = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    const code = resolveErrorCode(error.code, statusCode);
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

function resolveErrorCode(code: string | undefined, statusCode: number) {
  if (statusCode === getStatusCode(ReasonPhrases.TOO_MANY_REQUESTS)) {
    return ERROR_CODES.RATE_LIMIT_EXCEEDED;
  }

  if (!code || code.trim().length === 0) {
    return ERROR_CODES.INTERNAL_SERVER_ERROR;
  }

  return code;
}

function resolveErrorMessage(message: string | undefined) {
  if (!message || message.trim().length === 0) {
    return 'Unhandled error occurred';
  }

  return message;
}
