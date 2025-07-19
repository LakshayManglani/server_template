import { Type } from '@sinclair/typebox';

import type { TSchema } from '@sinclair/typebox';

export const META_SCHEMA = Type.Object({
  requestId: Type.String(),
  timeStamp: Type.String(),
});

export function createApiResponseSchema<Data extends TSchema>(dataSchema: Data) {
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
