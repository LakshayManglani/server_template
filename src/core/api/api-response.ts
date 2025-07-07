import type { FastifyReply, FastifyRequest } from 'fastify';

export function generateApiResponse<T extends object | null>(
  fastifyRequest: FastifyRequest,
  fastifyReply: FastifyReply,
  responseOptions: {
    message: string;
    statusCode: number;
    data: T;
  },
) {
  const { message, data, statusCode } = responseOptions;

  fastifyReply.code(statusCode);

  return {
    success: true,
    data,
    message,
    meta: {
      requestId: fastifyRequest.id,
      timeStamp: new Date().toISOString(),
    },
  };
}
