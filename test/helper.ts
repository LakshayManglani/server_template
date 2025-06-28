import { buildApp } from '@/app';
import { loadEnvironmentConfig } from '@/configs/environment';
import { getFastifyServerConfig } from '@/configs/server';

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
