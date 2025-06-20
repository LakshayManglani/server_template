import { createPet } from '@/pet';
import { Shelter } from '@/shelter';

const shelter = new Shelter();

shelter.addPet(createPet('Jerry', 'mouse', 1));
shelter.addPet(createPet('Tom', 'cat', 2));

console.log('Available pets:', shelter.listAvailablePets());

const adopted = shelter.adoptByName('Tom');
console.log('Adopted:', adopted);

console.log('Available after adoption:', shelter.listAvailablePets());
