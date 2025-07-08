import { getTimestamp } from '@/core/utilities';

import type { FastifyReply, FastifyRequest } from 'fastify';
import type { FastifyTypebox } from '@/types/fastify';

export function generateApiResponse(options: {
  app: FastifyTypebox;
  request: FastifyRequest;
  reply: FastifyReply;
  response: {
    message: string;
    statusCode: number;
    data: object;
  };
}) {
  const { app, request, reply } = options;
  const { message, data, statusCode } = options.response;
  const { APP_ENV } = app.secrets;

  reply.code(statusCode);

  return {
    success: true,
    data,
    message,
    meta: {
      requestId: request.id,
      timeStamp: getTimestamp(APP_ENV),
    },
  };
}
