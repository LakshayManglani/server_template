import type { Environment } from '@/core/environment';
import type { FastifyRequest, FastifyServerOptions } from 'fastify';
import { PinoLoggerOptions } from 'fastify/types/logger';

export function getLoggerConfig({
  appEnvironment,
  logLevel,
}: {
  appEnvironment: Environment['APP_ENV'];
  logLevel: Environment['LOG_LEVEL'];
}): NonNullable<FastifyServerOptions['logger']> {
  const redact: PinoLoggerOptions['redact'] = {
    censor: 'REDACTED',
    paths: [
      'req.headers.authorization',
      'req.headers.cookie',
      'res.headers["set-cookie"]',
      'req.body.password',
      'req.body.confirmPassword',
      'req.body.token',
    ],
  };

  const serializers: PinoLoggerOptions['serializers'] = {
    req: serializeRequest,
  };

  if (appEnvironment === 'development') {
    return {
      level: logLevel,
      redact,
      serializers,
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'SYS:yyyy-mm-dd HH:MM:ss:ms',
          ignore: 'pid,hostname',
        },
      },
    };
  }

  return { level: logLevel, redact, serializers };
}

function serializeRequest(request: FastifyRequest) {
  const shouldLogBody = request.routeOptions.config.logBody ?? false;

  const socket: {
    remotePort?: number;
  } = {};

  if (request.socket.remotePort !== undefined) {
    socket.remotePort = request.socket.remotePort;
  }

  return {
    method: request.method,
    url: request.url,
    hostname: request.hostname,
    remoteAddress: request.ip,
    body: shouldLogBody ? request.body : undefined,
    ...socket,
  };
}
