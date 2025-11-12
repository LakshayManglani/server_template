import { Type } from '@sinclair/typebox';
import { envSchema } from 'env-schema';

import type { EnvSchemaOpt } from 'env-schema';
import type { Static } from '@sinclair/typebox';

export const environmentSchema = Type.Object({
  NODE_ENV: Type.Union([Type.Literal('production'), Type.Literal('test')]),
  APP_ENV: Type.Union([
    Type.Literal('production'),
    Type.Literal('development'),
    Type.Literal('test'),
  ]),

  HOST: Type.String({ default: '0.0.0.0' }),
  PORT: Type.Integer({ default: 3000 }),
  CORS_ORIGINS: Type.Array(Type.String()),

  LOG_LEVEL: Type.Union([
    Type.Literal('fatal'),
    Type.Literal('error'),
    Type.Literal('warn'),
    Type.Literal('info'),
    Type.Literal('debug'),
    Type.Literal('trace'),
    Type.Literal('silent'),
  ]),

  RATE_LIMIT_MAX: Type.Integer({ default: 100 }),
  // Duration of the time window in milliseconds
  RATE_LIMIT_TIME_WINDOW: Type.Integer({ default: 1000 * 60 }),
  RATE_LIMIT_CACHE: Type.Integer({ default: 5000 }),

  DATABASE_URL: Type.String({}),

  // Should be a 256-bit (32 bytes) random key in hex format
  COOKIE_SECRET: Type.String({}),

  CLOUDINARY_CLOUD_NAME: Type.String({}),
  CLOUDINARY_API_KEY: Type.String({}),
  CLOUDINARY_API_SECRET: Type.String({}),
  CLOUDINARY_FOLDER: Type.String({}),
});

export type Environment = Static<typeof environmentSchema>;

export function loadEnvironmentConfig(environmentSchemaOptions: EnvSchemaOpt = {}) {
  const { data, ...options } = environmentSchemaOptions;

  const CORS_ORIGINS = process.env.CORS_ORIGINS?.trim().replaceAll(' ', '').split(',');

  const fullData: typeof data = [
    {
      CORS_ORIGINS,
    },
    ...(data ? (Array.isArray(data) ? data : [data]) : []),
  ];

  return envSchema<Environment>({
    ...options,
    schema: environmentSchema,
    data: fullData,
  });
}
