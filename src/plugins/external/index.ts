import corsPlugin from '@/plugins/external/cors';
import helmetPlugin from '@/plugins/external/helmet';
import rateLimitPlugin from '@/plugins/external/rate-limit';
import fastifyPlugin from 'fastify-plugin';

import type { FastifyInstance } from 'fastify';

async function externalPluginsLoader(fastify: FastifyInstance) {
  await fastify.register(corsPlugin);
  await fastify.register(helmetPlugin);
  await fastify.register(rateLimitPlugin);
}

export const externalPlugin = fastifyPlugin(externalPluginsLoader);

export default externalPlugin;
