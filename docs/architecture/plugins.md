# Plugins

Plugins are a core Fastify feature that enable developers to modularly extend the server with additional features or capabilities. This template organizes plugins into **external** and **application-specific** layers for clarity and maintainability.

## Folder Structure

```txt
plugins/
├── app/                      # Application-specific plugins
└── external/                 # External/third-party plugin wrappers
    ├── external.module.ts    # Registers all external plugins
    ├── cors.plugin.ts        # Enables CORS
    └── swagger.plugin.ts     # Enables Swagger API documentation
```

### External Plugins

These wrap and configure third-party Fastify plugins (e.g., CORS, Swagger, Helmet).
They are **registered before** application-level plugins to ensure availability where needed.

### Application Plugins

These are internal plugins created for your project’s needs (e.g., auth hooks, decorators, lifecycle logic).

## Plugin Loading Order

External plugins are loaded first (via `external.module.ts`), followed by app plugins.
This ensures that any app-specific plugin depending on an external one (e.g., CORS or rate-limit) will function properly.

## Example: Defining a Plugin

This wraps the `@fastify/cors` plugin to configure allowed origins and HTTP methods:

::: code-group

```ts [cors.plugin.ts]
import { fastifyCors } from '@fastify/cors';
import { fastifyPlugin } from 'fastify-plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function corsLoader(fastify: FastifyTypebox) {
  const { CORS_ORIGINS } = fastify.secrets;

  await fastify.register(fastifyCors, {
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    origin: CORS_ORIGINS,
  });
}

export const corsPlugin = fastifyPlugin(corsLoader);
```

:::

## Example: Grouping External Plugins

All external plugins are registered using a single module:
::: code-group

```ts [external.module.ts]
import { fastifyPlugin } from 'fastify-plugin';

import { corsPlugin } from './cors.plugin';
import { helmetPlugin } from './helmet.plugin';
import { rateLimitPlugin } from './rate-limit.plugin';

import type { FastifyTypebox } from '@/types/fastify';

async function externalModuleLoader(fastify: FastifyTypebox) {
  await Promise.resolve([
    fastify.register(corsPlugin),
    fastify.register(helmetPlugin),
    fastify.register(rateLimitPlugin),
  ]);
}

export const externalModulePlugin = fastifyPlugin(externalModuleLoader);
```

:::
