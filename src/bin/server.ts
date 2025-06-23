import { buildApp } from '@/app';
import handleShutdown from '@/shutdown';

/**
 * Main entry point for the Fastify server.
 *
 * - Builds and configures the Fastify application.
 * - Registers shutdown hooks.
 * - Starts listening on port 8090.
 *
 * Logs any startup errors and sets the exit code on failure.
 */
async function main() {
  const app = await buildApp({
    serverOptions: {
      logger: {
        transport: {
          target: 'pino-pretty',
          options: {
            colorize: true,
            translateTime: 'SYS:yyyy-mm-dd HH:MM:ss:ms',
            ignore: 'pid,hostname',
          },
        },
        level: 'debug',
      },
    },
  });

  try {
    await app.ready();
    handleShutdown(app);

    await app.listen({
      host: '0.0.0.0',
      port: 8090,
    });
  } catch (error) {
    app.log.error(error, 'Application failed to start');
    process.exitCode = 1;
  }
}

await main();
