export type PetType = "dog" | "cat" | "mouse";

export interface Pet {
  name: string;
  type: PetType;
  age: number;
  adopted: boolean;
}
