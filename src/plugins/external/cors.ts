import { fastifyCors } from '@fastify/cors';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyInstance } from 'fastify';

async function corsLoader(fastify: FastifyInstance) {
  const { CORS_ORIGINS } = fastify.secrets;

  await fastify.register(fastifyCors, {
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: CORS_ORIGINS,
  });
}

export const corsPlugin = fastifyPlugin(corsLoader);
export default corsPlugin;
