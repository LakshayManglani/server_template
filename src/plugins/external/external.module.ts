import { fastifyPlugin } from 'fastify-plugin';

import { corsPlugin } from '@/plugins/external/cors.plugin';
import { helmetPlugin } from '@/plugins/external/helmet.plugin';
import { prismaPlugin } from '@/plugins/external/prisma.plugin';
import { rateLimitPlugin } from '@/plugins/external/rate-limit.plugin';
import { swaggerPlugin } from '@/plugins/external/swagger.plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function externalModuleLoader(fastify: FastifyTypebox) {
  await Promise.resolve([
    fastify.register(corsPlugin),
    fastify.register(helmetPlugin),
    fastify.register(rateLimitPlugin),
    fastify.register(swaggerPlugin),
    fastify.register(prismaPlugin),
  ]);
}

export const externalModulePlugin = fastifyPlugin(externalModuleLoader);
