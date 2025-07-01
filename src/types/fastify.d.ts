import { Environment } from '@/core/environment';

declare module 'fastify' {
  interface FastifyInstance {
    secrets: Environment;
  }

  interface FastifyContextConfig {
    logBody?: boolean;
  }
}
