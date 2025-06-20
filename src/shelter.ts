import { adoptPet } from '@/pet';
import { Pet } from '@/types/pet';

export class Shelter {
  #pets: Pet[] = [];

  addPet(pet: Pet): void {
    this.#pets.push(pet);
  }

  listAvailablePets(): Pet[] {
    return this.#pets.filter((pet) => !pet.adopted);
  }

  adoptByName(name: string): Pet | null {
    const pet = this.#pets.find((p) => p.name === name && !p.adopted);
    if (!pet) return null;
    const adoptedPet = adoptPet(pet);
    this.#pets = this.#pets.map((p) => (p.name === name ? adoptedPet : p));
    return adoptedPet;
  }
}
