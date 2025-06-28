import { Environment } from '@/configs/environment';

declare module 'fastify' {
  interface FastifyInstance {
    secrets: Environment;
  }
}
