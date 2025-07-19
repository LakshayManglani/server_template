# Services

**Services** encapsulate domain-specific business logic such as database interactions and utility operations. They are implemented as **Fastify plugins** and are designed to be modular and scoped—**not globally registered**.

## Folder Structure

Unlike routes, services are **not versioned**. They are grouped by domain under the top-level `services/` directory.

Each domain has its own folder containing a single plugin file named `{domain}.service.ts`.

```
services/
└── todos/
    └── todos.service.ts    # Plugin to decorate the todos service
```

## How Services Work

- Services are **not globally available** to all routes.
- To use a service inside a route, you must **explicitly register it** in that domain’s module file (`{domain}.module.ts`).
- After registration,Export an interface (e.g., TodosService) defining the available methods.
  services can be accessed using:
  `app.service.todos.createTodo`,
  `app.service.todos.getTodos`, etc.

## Defining a Service: `{domain}.service.ts`

Each service should:

1. **Export an interface** (e.g., `TodosService`) defining the available methods.
2. Be typed properly via `src/types/fastify.d.ts` so the methods are available on `app.service`.
3. **Avoid `encapsulate: true`** in the plugin config. This allows other plugins/routes to access the decorated service.

::: code-group

```ts [todos.service.ts]
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
        // logic
      },
      async createTodo(options) {
        // logic
      },
    },
  });
}

export const todosServicePlugin = fastifyPlugin(todosServiceLoader, {
  name: 'todosService',
});
```

:::
