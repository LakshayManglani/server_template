import { ErrorCode } from '@/core/errors/error-codes';

class AppError extends Error {
  public readonly code: ErrorCode;

  constructor(message: string, code: ErrorCode) {
    super(message);
    this.code = code;
  }
}

export { AppError };
