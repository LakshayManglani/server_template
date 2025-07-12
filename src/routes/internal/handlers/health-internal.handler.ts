import { Type } from '@sinclair/typebox';
import { StatusCodes } from 'http-status-codes';

import type { FastifyTypebox } from '@/types/fastify';

const RESPONSE_STATUS_CODE = StatusCodes.OK;

export function healthInternalHandler(app: FastifyTypebox) {
  app.get(
    '/health',
    {
      schema: {
        tags: ['internal'],
        summary: 'Health check',
        description: 'Check if the server is running.',
        operationId: 'getHealth',
        consumes: ['application/json'],
        response: {
          [RESPONSE_STATUS_CODE]: RESPONSE_SCHEMA,
        },
      },
    },
    async function health() {
      return {};
    },
  );
}

const RESPONSE_SCHEMA = Type.Object(
  {},
  {
    additionalProperties: false,
  },
);
