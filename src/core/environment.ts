import { Type } from '@sinclair/typebox';
import envSchema from 'env-schema';

import type { Static } from '@sinclair/typebox';
import type { EnvSchemaData } from 'env-schema';

export const environmentSchema = Type.Object({
  NODE_ENV: Type.Union([Type.Literal('production'), Type.Literal('test')]),
  APP_ENV: Type.Union([
    Type.Literal('production'),
    Type.Literal('development'),
    Type.Literal('test'),
  ]),

  HOST: Type.String({ default: '0.0.0.0' }),
  PORT: Type.Integer({ default: 3000 }),

  LOG_LEVEL: Type.Union([
    Type.Literal('fatal'),
    Type.Literal('error'),
    Type.Literal('warn'),
    Type.Literal('info'),
    Type.Literal('debug'),
    Type.Literal('trace'),
    Type.Literal('silent'),
  ]),
});

export type Environment = Static<typeof environmentSchema>;

export function loadEnvironmentConfig(options: { data?: EnvSchemaData } = {}) {
  const data = options.data ?? {};

  return envSchema<Environment>({
    schema: environmentSchema,
    data,
  });
}
