# Folder Structure

This project follows a modular, scalable architecture designed for clarity, maintainability, and fast team onboarding.

## Root Directory

```txt
server_template/
├── src/           # Application source code
├── test/          # Vitest test files
├── prisma/        # Prisma schema and migrations
├── docs/          # VitePress-powered documentation
├── dist/          # Compiled output (after build)
├── coverage/      # Code coverage reports
├── .vscode/       # VSCode settings and extensions
├── .husky/        # Git hooks (e.g., pre-commit, pre-push)
├── .github/       # GitHub Actions workflows (CI)
├── .env.sample    # Example env config (copy to .env)
├── package.json   # Scripts, dependencies, and metadata
├── tsconfig.json  # TypeScript config
└── ...
```

## `src/` – Application Code

```txt
src/
├── bin/           # Entrypoint to start the Fastify server
├── config/        # Environment configs, logging configs, constants
├── core/          # Core utilities (e.g., error handler, api response, shutdown helpers)
├── plugins/       # Custom Fastify plugins (CORS, Swagger, etc.)
├── routes/        # Application routes (grouped by version and domain)
├── services/      # Business logic and reusable functions
└── types/         # Shared TypeScript types
```

### `routes/` – Modular API Routing

```txt
routes/
└── api/
    └── v1/
        └── examples/
            └── todos/
                ├── handlers/
                │   └── create-todo.handler.ts      # Individual logic handlers
                ├── todos.routes.ts                 # Registers route handlers as Fastify plugin
                └── todos.module.ts                 # Wraps route with required services/plugins
```

> See [Routing System](../architecture/routes.md) for setup conventions.

### `services/` – Business Logic

```txt
services/
└── todos/
    └── todos.service.ts   # Logic to interact with DB or implement features
```

> See [Service Layer](../architecture/services.md) for usage and patterns.

### `plugins/` – Fastify Plugins

```txt
plugins/
├── cors.ts               # CORS setup
├── swagger.ts            # Swagger/OpenAPI docs
├── rate-limit.ts         # Rate limiter
└── ...
```

> See [Plugins](../architecture/plugins.md) for plugin conventions.

## `test/` – Testing with Vitest

```txt
test/
└── routes/
    └── api/
        └── v1/
            └── examples/
                └── todos/
                    └── create-todo.test.ts
```

<!-- > See [Testing Overview](../testing/overview.md) and [Writing Tests](../testing/writing-tests.md). -->

## `prisma/` – Database Schema

```txt
prisma/
├── schema.prisma         # Main database schema
└── migrations/           # Auto-generated migrations
```

<!-- > See [Database Setup](../development/database.md) for managing schema and commands. -->

## `docs/` – Project Documentation

```txt
docs/
├── index.md              # Home page
├── getting-started/
├── architecture/
└── ...
```

> Built using **VitePress**.

## `.vscode/` – Editor Configuration

```txt
.vscode/
├── extensions.json       # Recommended VSCode extensions
├── settings.json         # Project-specific settings
└── ...
```

> See [VSCode Setup](vscode)

## Other Configs & Automation

- `.husky/` – Git hooks powered by Husky
- `.github/` – CI pipeline via GitHub Actions
