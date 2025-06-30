import envSchema from 'env-schema';
import { URL } from 'node:url';
import { defineConfig } from 'vitest/config';
import { environmentSchema } from './src/core/environment';

function loadTestEnvironmentConfig() {
  return envSchema({
    schema: environmentSchema,
    dotenv: {
      path: '.env.test',
    },
  });
}

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    alias: {
      '@/': new URL('src/', import.meta.url).pathname,
    },
    coverage: {
      include: ['src'],
    },
    env: loadTestEnvironmentConfig(),
  },
});
