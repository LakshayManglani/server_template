import { PrismaClient } from '@prisma/client';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function prismaLoader(app: FastifyTypebox) {
  const { DATABASE_URL } = app.secrets;

  const prisma = new PrismaClient({
    datasourceUrl: DATABASE_URL,
  });

  try {
    await prisma.$connect();
  } catch (error) {
    app.log.error(error, 'Failed to connect to the database');
    throw error;
  }

  app.decorate('prisma', prisma);

  app.addHook('onClose', async function prismaClosingHook() {
    await app.prisma.$disconnect();
  });
}

export const prismaPlugin = fastifyPlugin(prismaLoader);
