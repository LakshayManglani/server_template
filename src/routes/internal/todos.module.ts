import { fastifyPlugin } from 'fastify-plugin';

import { internalRoutesPlugin } from '@/routes/internal/internal.routes';

import type { FastifyTypebox } from '@/types/fastify';

async function internalModuleLoader(app: FastifyTypebox) {
  await app.register(internalRoutesPlugin);
}

export const internalModulePlugin = fastifyPlugin(internalModuleLoader, {
  name: 'internalModule',
  encapsulate: true,
});
