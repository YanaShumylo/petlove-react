import type { Pet } from '../../../types/pet';
import PetsItem from '../PetsItem/PetsItem';
import css from './PetsList.module.css';

interface PetsListProps {
  pets?: Pet[];
}

export default function PetsList({ pets= [] }: PetsListProps) {
  if (!pets.length) {
    return <p className={css.text}>No pets yet</p>;
  }

  return (
    <>
    <p className={css.text}> My pets</p>
    <ul className={css.petsList}>
      {pets.map(pet => (
        <PetsItem key={pet._id} pet={pet} />
      ))}
    </ul>
    </>
  );
}