import { Pet, PetType } from "@/types/pet";

export function createPet(name: string, type: PetType, age: number): Pet {
  return {
    name,
    type,
    age,
    adopted: false,
  };
}

export function adoptPet(pet: Pet): Pet {
  return {
    ...pet,
    adopted: true,
  };
}
