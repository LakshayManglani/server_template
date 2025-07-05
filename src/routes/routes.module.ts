import { FastifyInstance } from 'fastify';
import { fastifyPlugin } from 'fastify-plugin';

import { v1ModulePlugin } from '@/routes/v1/v1.module';

async function routesModule(app: FastifyInstance) {
  await app.register(v1ModulePlugin, {
    prefix: 'v1',
  });
}

export const routesModulePlugin = fastifyPlugin(routesModule, {
  name: 'routesModule',
  encapsulate: true,
});
