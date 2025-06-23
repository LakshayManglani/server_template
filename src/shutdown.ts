import { FastifyInstance } from 'fastify';

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
 * import { FastifyInstance } from "fastify";
 *
 * const app: FastifyInstance = fastify();
 *
 * process.once("SIGINT", () => { closeApp(app) }); // Handles Ctrl+C
 * process.once("SIGTERM", () => { closeApp(app) }); // Handles process termination
 * ```
 *
 * @param [closeTimeout=10_000] - Time in milliseconds to wait before forcing termination.
 */
async function closeApp(instance: FastifyInstance, closeTimeout = 10_000) {
  const timeout = setTimeout(() => {
    instance.log.error('Application did not close in time. Force closing.');
    process.exitCode = 1;
  }, closeTimeout);
  timeout.unref();

  try {
    await instance.close();
    instance.log.info('Application closed');
  } catch (error) {
    instance.log.error('Error closing application:', error);
    process.exitCode = 1;
  }
}

let isShuttingDown = false;
function handleEvent(event: NodeJS.Signals, app: FastifyInstance) {
  process.on(event, () => {
    if (isShuttingDown) return;
    isShuttingDown = true;

    app.log.info(`${event} received.`);
    closeApp(app).catch((error: unknown) => {
      console.error('Unexpected error during shutdown:', error);
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
function handleShutdown(app: FastifyInstance) {
  handleEvent('SIGTERM', app);
  handleEvent('SIGINT', app);
}

export default handleShutdown;
