import { TSchema, Type } from '@sinclair/typebox';

export const META_SCHEMA = Type.Object({
  requestId: Type.String(),
  timeStamp: Type.String(),
});

export function createApiResponseType(dataSchema?: TSchema) {
  return Type.Object({
    success: Type.Boolean(),
    message: Type.String(),
    data: dataSchema ?? Type.Object({}),
    meta: META_SCHEMA,
  });
}
