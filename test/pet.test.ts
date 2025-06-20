import { createPet } from '@/pet';
import type { Pet } from '@/types/pet';
import { expect, test } from 'vitest';

test('createPet returns a new pet object with given properties', () => {
  const expected: Pet = {
    name: 'jerry',
    type: 'mouse',
    age: 5,
    adopted: false,
  };

  const result = createPet('jerry', 'mouse', 5);

  expect(result).toStrictEqual(expected);
});
