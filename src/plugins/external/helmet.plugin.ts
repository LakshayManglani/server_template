import { fastifyHelmet } from '@fastify/helmet';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function helmetLoader(fastify: FastifyTypebox) {
  await fastify.register(fastifyHelmet, {
    contentSecurityPolicy: false,
  });
}

export const helmetPlugin = fastifyPlugin(helmetLoader);
