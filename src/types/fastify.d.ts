import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import {
  FastifyBaseLogger,
  FastifyInstance,
  RawReplyDefaultExpression,
  RawRequestDefaultExpression,
  RawServerDefault,
} from 'fastify';

import { Environment } from '@/core/environment';
import { TodosService } from '@/services/todos/todos.service';

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
  }

  interface FastifyContextConfig {
    logBody?: boolean;
  }

  interface FastifyRequest {
    service: {
      todos: TodosService;
    };
  }
}
