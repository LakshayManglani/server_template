import { TSchema, Type } from '@sinclair/typebox';

export const META_SCHEMA = Type.Object({
  requestId: Type.String(),
  timeStamp: Type.String(),
});

export function createApiResponseType<Data extends TSchema>(dataSchema: Data) {
  return Type.Object(
    {
      success: Type.Boolean(),
      message: Type.String(),
      data: dataSchema,
      meta: META_SCHEMA,
    },
    {
      additionalProperties: false,
    },
  );
}
