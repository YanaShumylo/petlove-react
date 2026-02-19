import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removePet  } from '../../../api/petsApi';
import type { Pet } from '../../../types/pet';
import toast from 'react-hot-toast';
import css from './PetsItem.module.css';

interface PetsItemProps {
  pet: Pet;
}

export default function PetsItem({ pet }: PetsItemProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => removePet (pet._id),
    onSuccess: (updatedUser) => {
      queryClient.setQueryData(['currentUser'], updatedUser);
      toast.success('Pet deleted successfully!');
    },
    onError: () => {
      toast.error('Failed to delete pet');
    },
  });

  const { mutate, isPending } = mutation;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this pet?')) {
      mutate();
    }
  };

  return (
    <div className={css.petItem}>
      <img className={css.image} src={pet.imgURL} alt={pet.name} />
      <div className={css.wrapperInfo}>

        <h3 className={css.title}>{pet.title}</h3>
        
        <div className={css.wrapperValueLabel}>
        <div className={css.wrapperValue}>
          <span className={css.label}>Name </span>
          <p className={css.value}>{pet.name}</p>
        </div>
        <div className={css.wrapperValue}>
          <span className={css.label}>Birthday</span>
          <p className={css.value}> {pet.birthday}</p>
        </div>
        <div className={css.wrapperValue}>
          <span className={css.label}>Sex</span>
          <p className={css.value}> {pet.sex}</p>
        </div>
        <div className={css.wrapperValue}>
          <span className={css.label}>Species</span>
          <p className={css.value}> {pet.species}</p>
          </div>
          </div>
      </div>
 
      <button className={css.deleteBtn} onClick={handleDelete} disabled={isPending}
        >
          <svg width="38" height="38">
        <use href="/svg-sprite.svg#icon-delete" />
      </svg>
      </button>
    </div>
  );
}