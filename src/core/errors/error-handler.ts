import { StatusCodes } from 'http-status-codes';

import { apiError, ApiError } from '@/core/api/api-error';
import { resolveErrorCode, resolveErrorMessage } from '@/core/errors/utilities';
import { getTimestamp } from '@/core/utilities';

import type { ApiErrorResponse } from '@/core/api/api-error';
import type { Environment } from '@/core/environment';
import type { FastifyTypebox } from '@/types/fastify';

function registerErrorHandler(app: FastifyTypebox) {
  app.setErrorHandler(async function errorHandler(error, request, reply) {
    const { APP_ENV } = app.secrets;

    const isApiError = error instanceof ApiError;

    const { stack } = error;
    const statusCode = error.statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR;
    const code = resolveErrorCode(error.code, statusCode);
    const message = resolveErrorMessage(error.message);

    reply.code(statusCode);

    request.log.error(
      {
        req: request,
        res: reply,
        err: error,
      },
      `[${code}] ${message}`,
    );

    if (
      isApiError ||
      code === 'FST_ERR_VALIDATION' ||
      error.name === 'SyntaxError' ||
      statusCode === 429
    ) {
      return getResponse({
        appEnv: APP_ENV,
        code,
        message,
        requestId: request.id,
        stack,
      });
    }

    const internalApiError = apiError({
      message: resolveErrorMessage(),
      code: 'INTERNAL_SERVER_ERROR',
      statusCode,
    });

    return getResponse({
      appEnv: APP_ENV,
      code: internalApiError.code,
      message: internalApiError.message,
      stack: internalApiError.stack,
      requestId: request.id,
    });
  });
}

function getResponse(options: {
  code: string;
  message: string;
  appEnv: Environment['APP_ENV'];
  stack?: string | undefined;
  requestId: string;
}) {
  const { appEnv, code, message, requestId, stack } = options;

  const isDevelopment = appEnv === 'development';

  const response: ApiErrorResponse = {
    success: false,
    error: {
      code,
      message,
      ...(isDevelopment && stack && { stack }),
    },
    meta: {
      requestId,
      timeStamp: getTimestamp(appEnv),
    },
  };

  return response;
}

export { registerErrorHandler };
