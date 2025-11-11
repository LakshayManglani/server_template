import { getReasonPhrase } from 'http-status-codes';

import { ERROR_CODES } from '@/core/errors/error-codes';

import type { FastifyRequest } from 'fastify';

export function resolveErrorCode(code: string | undefined, statusCode?: number) {
  if (code?.trim().length) return code;

  try {
    const codeFromStatusCode = getReasonPhrase(statusCode ?? 500);

    return codeFromStatusCode;
  } catch {
    return ERROR_CODES.INTERNAL_SERVER_ERROR;
  }
}

export function resolveErrorMessage(message?: string) {
  if (!message || message.trim().length === 0) {
    return 'Unhandled error occurred';
  }

  return message;
}

export function getErrorMessage(error: unknown): string {
  let errorCode: string | undefined = undefined;
  let errorMessage: string | undefined = undefined;

  if (typeof error === 'object' && error !== null) {
    if ('code' in error && typeof error.code === 'string') {
      errorCode = error.code;
    }

    if ('message' in error && typeof error.message === 'string') {
      errorMessage = error.message;
    }
  }

  const code = resolveErrorCode(errorCode);
  const message = resolveErrorMessage(errorMessage);

  return `[${code}] ${message}`;
}

export function logError(request: FastifyRequest, error: unknown) {
  request.log.error(error, getErrorMessage(error));
}
