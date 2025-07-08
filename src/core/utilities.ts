import type { Environment } from '@/core/environment';

/**
 * Returns the current timestamp formatted based on the application environment.
 */
export function getTimestamp(appEnvironment: Environment['APP_ENV']) {
  const isDevelopment = appEnvironment === 'development';
  return isDevelopment ? new Date().toLocaleString() : new Date().toISOString();
}
