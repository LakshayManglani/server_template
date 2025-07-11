import type {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';
import type { Environment } from '@/core/environment';
import type { TodosService } from '@/services/todos/todos.service';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

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
    service: {
      todos: TodosService;
    };
  }

  interface FastifyContextConfig {
    logBody?: boolean;
  }
}
