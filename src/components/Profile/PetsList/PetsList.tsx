import type { Pet } from '../../../types/pet';
import PetsItem from '../PetsItem/PetsItem';
import css from './PetsList.module.css';

interface PetsListProps {
  pets: Pet[];
}

export default function PetsList({ pets= [] }: PetsListProps) {
  return (
  <div className={css.wrapper}>
      {pets.length === 0 ? (
   <p className={css.text}>No pets yet</p>
  ) : (
        <>
          <p className={css.text}>My pets</p>
  
    <ul className={css.petsList}>
      {pets.map(pet => (
        <PetsItem key={pet._id} pet={pet} />
      ))}
    </ul>
  </>
      )}
    </div>
  );
}