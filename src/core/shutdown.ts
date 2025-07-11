import type { FastifyTypebox } from '@/types/fastify';

/**
 * Gracefully shuts down the Fastify application.
 * If the application does not close within the specified `closeTimeout`,
 * the process will be forcefully terminated.
 *
 * ## How It Works:
 * - Calls `instance.close()` to shut down the Fastify server.
 * - If the process takes longer than `closeTimeout`, it logs an error and exits with status code `1`.
 * - Uses `timeout.unref()` to allow the process to exit naturally if the application closes before the timeout.
 *
 * ## Example
 *
 * ```ts
 * import { FastifyTypebox } from "fastify";
 *
 * const app: FastifyTypebox = fastify();
 *
 * process.once("SIGINT", () => { closeApp(app) }); // Handles Ctrl+C
 * process.once("SIGTERM", () => { closeApp(app) }); // Handles process termination
 * ```
 *
 * @param [closeTimeout=10_000] - Time in milliseconds to wait before forcing termination.
 */
async function closeFastifyApp(app: FastifyTypebox, closeTimeout = 10_000) {
  const timeout = setTimeout(() => {
    app.log.error('Application did not close in time. Force closing.');
    process.exitCode = 1;
  }, closeTimeout);
  timeout.unref();

  try {
    await app.close();
    app.log.info('Application closed');
  } catch (error) {
    app.log.error(error, 'Error closing application:');
    process.exitCode = 1;
  }
}

let isShuttingDown = false;
function handleEvent(event: NodeJS.Signals, app: FastifyTypebox) {
  process.on(event, () => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    app.log.info(`${event} received.`);
    closeFastifyApp(app).catch((error: unknown) => {
      app.log.error(error, 'Unexpected error during shutdown:');
      process.exitCode = 1;
    });
  });
}

/**
 * Registers handlers to gracefully shut down the Fastify application
 * when termination signals (`SIGINT`, `SIGTERM`) are received.
 *
 * ## Example:
 * ```ts
 * import handleShutdown from "./shutdown";
 * handleShutdown(app);
 * ```
 */
export function handleShutdown(app: FastifyTypebox) {
  handleEvent('SIGTERM', app);
  handleEvent('SIGINT', app);
}
