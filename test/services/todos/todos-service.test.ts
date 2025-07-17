import { buildTestApp } from 'test/helper';
import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';

import { TodosService, todosServicePlugin } from '@/services/todos/todos.service';

import type { FastifyTypebox } from '@/types/fastify';

describe('todos service', () => {
  let app: FastifyTypebox;
  let todosService: TodosService;

  beforeAll(async () => {
    app = await buildTestApp({
      plugins: [todosServicePlugin],
    });
    todosService = app.service.todos;
  });

  beforeEach(async () => {
    await app.prisma.todo.deleteMany();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('createTodo', () => {
    it('should create a todo with title only', async () => {
      const result = await todosService.createTodo({
        title: 'Buy milk',
      });

      expect(result).toMatchObject({
        title: 'Buy milk',
        description: null,
      });
      expect(result.id).toBeDefined();
      expect(result.createdAt).toBeInstanceOf(Date);
      expect(result.updatedAt).toBeInstanceOf(Date);
    });

    it('should create a todo with title and description', async () => {
      const result = await todosService.createTodo({
        title: 'Workout',
        description: 'Go to the gym at 6pm',
      });

      expect(result).toMatchObject({
        title: 'Workout',
        description: 'Go to the gym at 6pm',
      });
    });

    it('should default description to null when not provided', async () => {
      const result = await todosService.createTodo({
        title: 'Read book',
      });

      expect(result.description).toBeNull();
    });

    it('should allow empty string as description', async () => {
      const result = await todosService.createTodo({
        title: 'Call mom',
        description: '',
      });

      expect(result.description).toBe('');
    });

    it('should persist data in the database', async () => {
      const created = await todosService.createTodo({
        title: 'Persistent task',
        description: 'Check DB',
      });

      const found = await app.prisma.todo.findUnique({
        where: { id: created.id },
      });

      expect(found).not.toBeNull();
      expect(found?.title).toBe('Persistent task');
      expect(found?.description).toBe('Check DB');
    });
  });

  describe('getTodos', () => {
    it('should return empty list and total 0 when no todos exist', async () => {
      const result = await todosService.getTodos({});

      expect(result.todos).toEqual([]);
      expect(result.pagination.total).toBe(0);
    });

    it('should return all todos when fewer than limit exist', async () => {
      await app.prisma.todo.createMany({
        data: [{ title: 'Task 1' }, { title: 'Task 2' }, { title: 'Task 3' }],
      });

      const result = await todosService.getTodos({});
      expect(result.todos).toHaveLength(3);
      expect(result.pagination.total).toBe(3);
    });

    it('should apply limit correctly', async () => {
      for (let index = 0; index < 15; index++) {
        await app.prisma.todo.create({
          data: { title: `Task ${index.toString()}` },
        });
      }

      const result = await todosService.getTodos({ limit: 5 });

      expect(result.todos).toHaveLength(5);
      expect(result.pagination.limit).toBe(5);
      expect(result.pagination.total).toBe(15);
    });

    it('should apply skip correctly', async () => {
      const expectedTodos = [];

      for (let index = 0; index < 10; index++) {
        await new Promise((resolve) => setTimeout(resolve, 10));
        const todo = await app.prisma.todo.create({
          data: { title: `Task ${index.toString()}` },
        });
        expectedTodos.push(todo);
      }

      const result = await todosService.getTodos({ skip: 5, limit: 10 });

      expect(result.todos).toHaveLength(5);
      expect(result.todos.map((todo) => todo.id)).toEqual(
        expectedTodos
          .sort((todo1, todo2) => todo2.createdAt.getTime() - todo1.createdAt.getTime())
          .slice(5)
          .map((todo) => todo.id),
      );
    });

    it('should sort todos by createdAt descending', async () => {
      const a = await app.prisma.todo.create({ data: { title: 'Old' } });

      const b = await app.prisma.todo.create({ data: { title: 'New' } });

      const result = await todosService.getTodos({});
      expect(result.todos[0].id).toBe(b.id);
      expect(result.todos[1].id).toBe(a.id);
    });
  });
});
