import { loadEnvironmentConfig } from '@/configs/environment';
import { describe, expect, it } from 'vitest';

describe('loadEnvironmentConfig', () => {
  it('throws a validation error if APP_ENV is missing', () => {
    expect(() =>
      loadEnvironmentConfig({
        data: {
          APP_ENV: undefined,
        },
      }),
    ).toThrowError("env must have required property 'APP_ENV'");
  });

  it('returns parsed config if all env vars are valid', () => {
    const result = loadEnvironmentConfig();

    expect(result.NODE_ENV).toBe('test');
    expect(result.APP_ENV).toBe('test');
  });

  it('uses default value for HOST and PORT when not provided', () => {
    const result = loadEnvironmentConfig({
      data: {
        HOST: undefined,
        PORT: undefined,
      },
    });

    expect(result.HOST).toBe('0.0.0.0');
    expect(result.PORT).toBe(3000);
  });

  it('throws if LOG_LEVEL is not one of the allowed values', () => {
    expect(() =>
      loadEnvironmentConfig({
        data: {
          LOG_LEVEL: 'unknown',
        },
      }),
    ).toThrowError(/env\/LOG_LEVEL must match a schema/);
  });
});
