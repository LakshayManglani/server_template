import { fastifyCookie } from '@fastify/cookie';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function cookieLoader(fastify: FastifyTypebox) {
  const { COOKIE_SECRET, APP_ENV } = fastify.secrets;

  const isProduction = APP_ENV === 'production';

  await fastify.register(fastifyCookie, {
    secret: COOKIE_SECRET,
    hook: 'onRequest',
    parseOptions: {
      secure: isProduction,
      sameSite: isProduction ? 'strict' : 'lax',
      path: '/',
      httpOnly: true,
    },
    logLevel: 'debug',
  });
}

export const cookiePlugin = fastifyPlugin(cookieLoader);
