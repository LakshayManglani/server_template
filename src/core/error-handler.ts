import { getStatusCode, ReasonPhrases, StatusCodes } from 'http-status-codes';

import { ERROR_CODES } from '@/core/errors/error-codes';
import { getTimestamp } from '@/core/utilities';

import type { ErrorResponse } from '@/core/errors/app-error';
import type { FastifyTypebox } from '@/types/fastify';

export function registerErrorHandler(app: FastifyTypebox) {
  app.setErrorHandler(async function errorHandler(error, request, reply) {
    const { APP_ENV } = app.secrets;
    const isDevelopment = APP_ENV === 'development';

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

    const response: ErrorResponse = {
      success: false,
      error: {
        code,
        message,
        ...(isDevelopment && stack && { stack }),
      },
      meta: {
        requestId: request.id,
        timeStamp: getTimestamp(APP_ENV),
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
