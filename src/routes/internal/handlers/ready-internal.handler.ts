import { Type } from '@sinclair/typebox';
import { StatusCodes } from 'http-status-codes';

import { AppError } from '@/core/errors/app-error';

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
    async function ready() {
      try {
        await app.prisma.$queryRaw`SELECT 1`;
      } catch (error) {
        app.log.error(error, 'Failed to connect to database');
        throw new AppError('Failed to connect to database', 'INTERNAL_SERVER_ERROR', 503);
      }

      return {
        ready: true,
      };
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
