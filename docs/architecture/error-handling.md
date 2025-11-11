# Error handling

All errors are handled through a **global error handler** defined in `src/core/error-handler.ts`.

## Throwing errors in routes

To throw an error inside a route, use the `apiError` function.  
`logError` function can used to log unknown error.
This ensures the error is logged and returned to the user in a consistent format.

::: code-group

```ts [ready-internal.handler.ts]
async function ready(request) {
  try {
    await app.prisma.$queryRaw`SELECT 1`;

    return {
      ready: true,
    };
  } catch (error) {
    logError(request, error);

    throw apiError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Failed to connect to database',
      statusCode: 503,
    });
  }
}
```

> [!NOTE]
>
> - Always use `logError` function if there is catch block wrapping a service/database call.

:::

## Throwing errors elsewhere

To throw an error inside a service/plugin or any app level function, use the `AppError` class.

```ts
import { AppError } from '@/core/errors/app-error';

async function login() {
  if (!user) {
    throw new AppError('Failed to get user', 'USER.NOT_FOUND');
  }
}
```

## Not Found Handler

The application also registers a catch-all **404 Not Found** handler for any undefined routes.
This handler also has custom **max rate-limit** value.

You can find it in:
`src/core/not-found-handler.ts`

## Error response

- In **development**, the response includes the error **stack trace** for easier debugging.
- The `timeStamp` field:
  - In development: shows local time.
  - In production: uses ISO format.
