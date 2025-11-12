import { fastifyPlugin } from 'fastify-plugin';

import { cloudinaryPlugin } from '@/plugins/external/cloudinary.plugin';
import { cookiePlugin } from '@/plugins/external/cookie.plugin';
import { corsPlugin } from '@/plugins/external/cors.plugin';
import { helmetPlugin } from '@/plugins/external/helmet.plugin';
import { multipartPlugin } from '@/plugins/external/multipart.plugin';
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
    fastify.register(cookiePlugin),
    fastify.register(multipartPlugin),
    fastify.register(cloudinaryPlugin),
  ]);
}

export const externalModulePlugin = fastifyPlugin(externalModuleLoader);
