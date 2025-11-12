import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import type { Environment } from '@/core/environment';
import type { Cloudinary } from '@/plugins/external/cloudinary.plugin';
import type { TodosService } from '@/services/todos/todos.service';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import type { PrismaClient } from '@prisma/client';

export type FastifyTypebox = FastifyInstance<
  RawServerDefault,
  RawRequestDefaultExpression,
  RawReplyDefaultExpression,
  FastifyBaseLogger,
  TypeBoxTypeProvider
>;

declare module 'fastify' {
  interface FastifyInstance extends FastifyInstance<TypeBoxTypeProvider> {
    secrets: Environment;
    prisma: PrismaClient;
    service: {
      todos: TodosService;
    };
    cloudinary: Cloudinary;
  }

  interface FastifyContextConfig {
    logBody?: boolean;
  }
}
