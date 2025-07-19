# Error Handling

All API errors are handled through a **global error handler** defined in `src/core/error-handler.ts`.

## Throwing Errors

To throw an error inside a route or service, use the `AppError` class.  
This ensures the error is logged and returned to the user in a consistent format.

::: code-group

```ts [ready-internal.handler.ts]
import { AppError } from '@/core/errors/app-error';

async function ready() {
  try {
    await app.prisma.$queryRaw`SELECT 1`;
  } catch (error) {
    app.log.error(error, 'Failed to connect to database');
    throw new AppError('Failed to connect to database', 'INTERNAL_SERVER_ERROR', 503);
  }

  return { ready: true };
}
```

:::

## Error Response Format

All structured errors follow this consistent format:
::: code-group

```ts
export interface ErrorResponse {
  success: false;
  error: {
    code: string;
    message: string;
  };
  meta: {
    requestId: string;
    timeStamp: string;
  };
}
```

:::

> [!NOTE]
>
> - In **development**, the response also includes the error **stack trace** for easier debugging.
> - The `timeStamp` field:
>   - In development: shows local time.
>   - In production: uses ISO format.

## Not Found Handler

The application also registers a catch-all **404 Not Found** handler for any undefined routes.
This handler also has custom **max rate-limit** value.

You can find it in:
`src/core/not-found-handler.ts`
