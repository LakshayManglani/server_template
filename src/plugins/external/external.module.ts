import { fastifyPlugin } from 'fastify-plugin';

import { corsPlugin } from '@/plugins/external/cors.plugin';
import { helmetPlugin } from '@/plugins/external/helmet.plugin';
import { rateLimitPlugin } from '@/plugins/external/rate-limit.plugin';

import type { FastifyInstance } from 'fastify';

async function externalModule(fastify: FastifyInstance) {
  await fastify.register(corsPlugin);
  await fastify.register(helmetPlugin);
  await fastify.register(rateLimitPlugin);
}

export const externalModulePlugin = fastifyPlugin(externalModule);
