# Environment

This project uses environment variables for configuration. The behavior and loading of environment files differ based on the context in which the app is running.

## Environment File Loading

| Context          | Environment File Loaded |
| ---------------- | ----------------------- |
| `pnpm dev`       | `.env`                  |
| `pnpm start`     | `.env`                  |
| Database scripts | `.env`                  |
| Testing scripts  | `.env.test`             |

> [!IMPORTANT]
>
> **In production, avoid using a `.env` file.** Instead, use environment-specific tooling (e.g., Docker secrets, cloud provider configs, or a secure secrets manager) to inject environment variables.

## Configuration Management

The `loadEnvironmentConfig` function is used to:

- Load environment variables.
- Sanitize them.
- Inject custom configuration logic (if needed).

This function is used in:

- `src/bin/server.ts` – during server startup.
- `vitest.config.ts` – for loading `.env.test` during test setup.

## Accessing Environment Variables

- All environment variables are **decorated on `app.secrets`**.
- This ensures consistent and safe access to configuration throughout the app.
- Always access env variables via `app.secrets` within any Fastify context.

## NODE_ENV

- `NODE_ENV` should be set to:
  - `"production"` during local development and production.
  - `"test"` during testing.

## APP_ENV

- `APP_ENV` should be set to :
  - `"development"` during local development.
  - `"production"` in production environments.
- This value influences things like error, logging verbosity, and timestamp formatting in error responses.
