import type { Pet } from '../../../types/pet';
import AddPet from '../AddPet/AddPet';
import PetsList from '../PetsList/PetsList';
import css from './PetsBlock.module.css';

interface PetsBlockProps {
  pets?: Pet[];
}

export default function PetsBlock({ pets = [] }: PetsBlockProps) {
  return (
    <section className={css.petsBlock}>
      <PetsList pets={pets}  />
      <AddPet />      
    </section>
  );
}