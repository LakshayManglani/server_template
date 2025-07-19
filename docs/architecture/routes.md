# Routes

Defines how API routes are organized, registered, and grouped by domain and version for maintainable server architecture.

## Folder structure

```txt
routes/
└── api/
    ├── v1/                                 # Version based routing
    │   ├── todos/                          # Domain based routing
    │   │   ├── handlers/
    │   │   │   └── create-todo.handler.ts  # Individual logic handlers
    │   │   ├── todos.routes.ts             # Plugin for registering handlers
    │   │   └── todos.module.ts             # Plugin for registering routes and dependencies
    │   └── auth/
    │       ├── handlers
    │       │   └── register-user.handler.ts
    │       ├── auth.routes.ts
    │       └── auth.module.ts
    └── v2/
        └── todos/
            ├── handlers
            │   └── create-todo.handler.ts
            ├── todos.routes.ts
            └── todos.module.ts
```

## File Responsibilities

| File / Folder        | Required | Description                                               |
| -------------------- | :------: | --------------------------------------------------------- |
| `{domain}.module.ts` |    ✅    | Registers the route plugin and its required dependencies. |
| `{domain}.routes.ts` |    ❓    | Defines and registers route handlers (if any).            |
| `handlers/`          |    ❓    | Individual route logic (e.g., `create-todo.handler.ts`).  |

## {domain}.module.ts

- This file acts as the primary plugin entry point for each domain.
- It registers all necessary dependencies (e.g., services) and the route plugin itself.
- It is also responsible for grouping route modules under a common prefix (e.g., `/api/v1/todos`).

For example. you can register required servicesPlugin before routesPlugin
::: code-group

```ts [todos.module.ts]
async function todosModuleLoader(app: FastifyTypebox) {
  await app.register(todosServicePlugin);
  await app.register(todosRoutesPlugin);
}

export const todosModulePlugin = fastifyPlugin(todosModuleLoader, {
  name: 'todosModule',
  encapsulate: true,
});
```

:::

For example, you can group multiple domain modules (like internalModulePlugin and apiModulePlugin) under a root `routes.module.ts`:

::: code-group

```ts [route.module.ts]
async function routesModuleLoader(app: FastifyTypebox) {
  await app.register(internalModulePlugin, {
    prefix: '/',
  });

  await app.register(apiModulePlugin, {
    prefix: '/api',
  });
}

export const routesModulePlugin = fastifyPlugin(routesModuleLoader, {
  name: 'routesModule',
  encapsulate: true,
});
```

:::

## {domain}.routes.ts

This file is responsible for registering route handlers (from the `handlers/` folder) into the Fastify instance.

It explicitly declares its plugin dependencies using the `dependencies` option. For example, the `todosRoutesPlugin` depends on `todosService`, and the app will fail to start if this dependency is not met.

:::code-group

```ts [todos.routes.ts]
async function todosRoutes(app: FastifyTypebox) {
  listTodosHandler(app);

  createTodoHandler(app);
}

export const todosRoutesPlugin = fastifyPlugin(todosRoutes, {
  encapsulate: true,
  name: 'todosRoutes',
  dependencies: ['todosService'],
});
```

:::

## handlers/

Each handler defines a specific endpoint logic (e.g., `POST /`, `GET /`). The handler receives the `Fastify` instance and registers the route.

Handlers are placed in a domain-specific folder inside `handlers/`.

::: code-group

```ts [create-todo.handler.ts]
export function createTodoHandler(app: FastifyTypebox) {
  const { service } = app;

  app.post(
    '/',
    {
      // logic
    },
    async function createTodo(request, reply) {
      // logic
    },
  );
}
```

```ts [list-todo.handler.ts]
export function listTodosHandler(app: FastifyTypebox) {
  const { service } = app;

  app.get(
    '/',
    {
      // logic
    },
    async function listTodos(request, reply) {
      // logic
    },
  );
}
```

:::
