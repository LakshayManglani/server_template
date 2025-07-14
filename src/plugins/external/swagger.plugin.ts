import os from 'node:os';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function swaggerLoader(app: FastifyTypebox) {
  const { APP_ENV, HOST, PORT } = app.secrets;

  if (APP_ENV !== 'development') {
    return;
  }

  const port = PORT.toString();

  await app.register(import('@fastify/swagger'), {
    openapi: {
      openapi: '3.0.0',
      info: {
        title: 'API documentation',
        description: 'Development-only API docs',
        version: '1.0.0',
      },
      servers:
        HOST === '0.0.0.0'
          ? getIPv4Addresses().map((host) => {
              return {
                url: `http://${host}:${port}`,
                description: 'Development server',
              };
            })
          : [
              {
                url: `http://${HOST}:${port}`,
                description: 'Development server',
              },
            ],
      tags: [
        { name: 'todos', description: 'Todos related end-points' },
        { name: 'internal', description: 'Endpoints for internal usage' },
      ],
    },
  });

  await app.register(import('@scalar/fastify-api-reference'), {
    routePrefix: '/docs',
    logLevel: 'silent',
  });
}

/**
 * Returns a list of unique IPv4 addresses on the current machine.
 *
 * @returns {string[]} An array of unique IPv4 address strings.
 */
function getIPv4Addresses(): string[] {
  const interfaces = os.networkInterfaces();
  const addresses = new Set<string>();

  for (const iface of Object.values(interfaces).flat()) {
    if (iface && iface.family === 'IPv4') {
      addresses.add(iface.address);
    }
  }

  return [...addresses];
}

export const swaggerPlugin = fastifyPlugin(swaggerLoader);
