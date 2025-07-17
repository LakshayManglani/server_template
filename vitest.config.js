import { URL } from 'node:url';
import { Type } from '@sinclair/typebox';
import { envSchema } from 'env-schema';
import { defineConfig } from 'vitest/config';

import { loadEnvironmentConfig } from './src/core/environment';

function loadTestEnvironmentConfig() {
  // Load environment variables from `.env.test` into `process.env` without overwriting existing values
  envSchema({
    dotenv: {
      path: '.env.test',
    },
    schema: Type.Object({}),
  });

  return loadEnvironmentConfig();
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
    fileParallelism: false,
  },
});
