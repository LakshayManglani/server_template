import { fastifyPlugin } from 'fastify-plugin';

import { corsPlugin } from '@/plugins/external/cors.plugin';
import { helmetPlugin } from '@/plugins/external/helmet.plugin';
import { rateLimitPlugin } from '@/plugins/external/rate-limit.plugin';
import { swaggerPlugin } from '@/plugins/external/swagger.plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function externalModule(fastify: FastifyTypebox) {
  await fastify.register(corsPlugin);
  await fastify.register(helmetPlugin);
  await fastify.register(rateLimitPlugin);
  await fastify.register(swaggerPlugin);
}

export const externalModulePlugin = fastifyPlugin(externalModule);
