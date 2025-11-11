import { ErrorCode } from '@/core/errors/error-codes';

class ApiError extends Error {
  public readonly statusCode: number;
  public readonly code: ErrorCode;

  constructor(message: string, code: ErrorCode, statusCode = 500) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
  }
}

function apiError(options: { message: string; code: ErrorCode; statusCode: number }) {
  const { message, code, statusCode } = options;
  return new ApiError(message, code, statusCode);
}

interface ApiErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
  meta: {
    requestId: string;
    timeStamp: string;
  };
}

export { apiError, ApiError };
export type { ApiErrorResponse };
