import { fastifyMultipart } from '@fastify/multipart';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function multipartLoader(fastify: FastifyTypebox) {
  await fastify.register(fastifyMultipart, {});
}

export const multipartPlugin = fastifyPlugin(multipartLoader);
