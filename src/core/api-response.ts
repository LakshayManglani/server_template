import type { FastifyReply, FastifyRequest } from 'fastify';

export function generateApiResponse(
  fastifyRequest: FastifyRequest,
  fastifyReply: FastifyReply,
  responseOptions: {
    message: string;
    statusCode: number;
    data: null | object;
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
