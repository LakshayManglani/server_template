import { Environment } from '@/core/environment';
import { TodosService } from '@/services/todos/todos.service';

declare module 'fastify' {
  interface FastifyInstance {
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
