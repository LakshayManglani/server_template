import { PrismaClient } from '@prisma/client';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function prismaLoader(app: FastifyTypebox) {
  const prisma = new PrismaClient();

  app.decorate('prisma', prisma);

  app.addHook('onClose', async function prismaClosingHook() {
    await app.prisma.$disconnect();
  });
}

export const prismaPlugin = fastifyPlugin(prismaLoader);
