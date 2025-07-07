import { fastifyRateLimit } from '@fastify/rate-limit';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function rateLimitLoader(fastify: FastifyTypebox) {
  const { RATE_LIMIT_MAX, RATE_LIMIT_TIME_WINDOW, RATE_LIMIT_CACHE } = fastify.secrets;

  await fastify.register(fastifyRateLimit, {
    max: RATE_LIMIT_MAX,
    timeWindow: RATE_LIMIT_TIME_WINDOW,
    cache: RATE_LIMIT_CACHE,
  });
}

export const rateLimitPlugin = fastifyPlugin(rateLimitLoader);
