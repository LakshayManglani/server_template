import { fastifyPlugin } from 'fastify-plugin';

import { healthInternalHandler } from '@/routes/internal/handlers/health-internal.handler';
import { readyInternalHandler } from '@/routes/internal/handlers/ready-internal.handler';

import type { FastifyTypebox } from '@/types/fastify';

async function internalRoutes(app: FastifyTypebox) {
  healthInternalHandler(app);
  readyInternalHandler(app);
}

export const internalRoutesPlugin = fastifyPlugin(internalRoutes, {
  encapsulate: true,
  name: 'internalRoutes',
});
