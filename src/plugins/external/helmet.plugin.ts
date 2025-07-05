import { fastifyHelmet } from '@fastify/helmet';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyInstance } from 'fastify';

async function helmetLoader(fastify: FastifyInstance) {
  await fastify.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });
}

export const helmetPlugin = fastifyPlugin(helmetLoader);
