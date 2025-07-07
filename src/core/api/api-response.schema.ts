import { TSchema, Type } from '@sinclair/typebox';

export const META_SCHEMA = Type.Object({
  requestId: Type.String(),
  timeStamp: Type.String(),
});

export function createApiResponseType<T extends TSchema>(dataSchema: T) {
  return Type.Object({
    success: Type.Boolean(),
    message: Type.String(),
    data: Type.Union([Type.Null(), dataSchema]),
    meta: META_SCHEMA,
  });
}
