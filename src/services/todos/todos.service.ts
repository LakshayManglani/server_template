import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';
import type { Todo } from '@prisma/client';

export interface TodosService {
  getTodos(options: { skip?: number; limit?: number }): Promise<{
    todos: Todo[];
    pagination: {
      skip: number;
      limit: number;
      total: number;
    };
  }>;
  createTodo(options: { title: string; description?: string | null }): Promise<Todo>;
}

async function todosServiceLoader(app: FastifyTypebox) {
  const { prisma } = app;

  app.decorate('service', {
    ...app.service,
    todos: {
      async getTodos(options) {
        const { skip = 0, limit = 10 } = options;

        const todos = await prisma.todo.findMany({
          skip,
          take: limit,
          orderBy: {
            createdAt: 'desc',
          },
        });
        const total = await prisma.todo.count();

        return {
          todos,
          pagination: {
            skip,
            limit,
            total,
          },
        };
      },
      async createTodo(options) {
        const { title, description = null } = options;

        const todo = await prisma.todo.create({
          data: {
            title,
            description,
          },
        });

        return todo;
      },
    },
  });
}

export const todosServicePlugin = fastifyPlugin(todosServiceLoader, {
  name: 'todosService',
});
