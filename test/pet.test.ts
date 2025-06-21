import { adoptPet, createPet } from '@/pet';
import type { Pet } from '@/types/pet';
import { describe, expect, test } from 'vitest';

describe('createPet', () => {
  test('should return a new pet with the specified properties', () => {
    const expected: Pet = {
      name: 'jerry',
      type: 'mouse',
      age: 5,
      adopted: false,
    };

    const result = createPet(expected.name, expected.type, expected.age);

    expect(result).toStrictEqual(expected);
  });
});

describe('adoptPet', () => {
  test('should mark the pet as adopted', () => {
    const pet = createPet('tom', 'cat', 3);
    const result = adoptPet(pet);

    expect(result).toStrictEqual({
      ...pet,
      adopted: true,
    });
  });
});
