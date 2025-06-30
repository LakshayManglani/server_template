import { buildApp } from '@/app';
import { getFastifyServerConfig } from '@/configs/server';
import { loadEnvironmentConfig } from '@/core/environment';
import { handleShutdown } from '@/core/shutdown';

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
  const environmentConfig = loadEnvironmentConfig();
  const { serverOptions, listenOptions } = getFastifyServerConfig({ environmentConfig });

  const app = await buildApp({
    serverOptions,
    environmentConfig,
  });

  try {
    await app.ready();
    handleShutdown(app);

    await app.listen(listenOptions);
  } catch (error) {
    app.log.error(error, 'Application failed to start');
    process.exitCode = 1;
  }
}

await main();
