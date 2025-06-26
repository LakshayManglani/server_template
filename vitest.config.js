import { URL } from 'node:url';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['test/**/*.test.ts'],
    alias: {
      '@/': new URL('src/', import.meta.url).pathname,
    },
    coverage: {
      include: ['src'],
    },
  },
});
