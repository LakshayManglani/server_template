import { buildApp } from '@/app';
import { getFastifyServerConfig } from '@/configs/server';
import { loadEnvironmentConfig } from '@/core/environment';

export async function buildTestApp() {
  const environmentConfig = loadEnvironmentConfig();
  const { serverOptions } = getFastifyServerConfig({ environmentConfig });

  const app = await buildApp({
    environmentConfig,
    serverOptions,
  });

  await app.ready();

  return app;
}
