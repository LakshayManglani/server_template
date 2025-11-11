import { Type } from '@sinclair/typebox';
import { StatusCodes } from 'http-status-codes';

import { apiError } from '@/core/api/api-error';
import { logError } from '@/core/errors/utilities';

import type { FastifyTypebox } from '@/types/fastify';

const RESPONSE_STATUS_CODE = StatusCodes.OK;

export function readyInternalHandler(app: FastifyTypebox) {
  app.get(
    '/ready',
    {
      schema: {
        tags: ['internal'],
        summary: 'Ready Check',
        description: 'Check if the server is running and ready to serve.',
        operationId: 'getReady',
        consumes: ['application/json'],
        response: {
          [RESPONSE_STATUS_CODE]: RESPONSE_SCHEMA,
        },
      },
    },
    async function ready(request) {
      try {
        await app.prisma.$queryRaw`SELECT 1`;

        return {
          ready: true,
        };
      } catch (error) {
        logError(request, error);

        throw apiError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to connect to database',
          statusCode: 503,
        });
      }
    },
  );
}

const RESPONSE_SCHEMA = Type.Object(
  {
    ready: Type.Boolean({
      description: 'ready is used to know that if the server is ready to serve.',
      examples: [true],
    }),
  },
  {
    additionalProperties: false,
  },
);
