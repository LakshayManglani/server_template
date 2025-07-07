import { fastifyCors } from '@fastify/cors';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function corsLoader(fastify: FastifyTypebox) {
  const { CORS_ORIGINS } = fastify.secrets;

  await fastify.register(fastifyCors, {
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: CORS_ORIGINS,
  });
}

export const corsPlugin = fastifyPlugin(corsLoader);
