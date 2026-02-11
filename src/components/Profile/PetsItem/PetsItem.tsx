import { useMutation, useQueryClient } from '@tanstack/react-query';
import { petsApi } from '../../../api/petsApi';
import type { Pet } from '../../../types/pet';
import toast from 'react-hot-toast';
import css from './PetsItem.module.css';

interface PetsItemProps {
  pet: Pet;
}

export default function PetsItem({ pet }: PetsItemProps) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: () => petsApi(pet._id),
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
      <img src={pet.imgURL} alt={pet.name} />
      <div>
        <p className={css.title}>{pet.title}</p>
        <p className={css.text}>Name: {pet.name}</p>
        <p className={css.text}>Birthday: {pet.birthday}</p>
        <p className={css.text}>Sex: {pet.sex}</p>
        <p className={css.text}>Species: {pet.species}</p>
      </div>

      <button onClick={handleDelete} disabled={isPending}
        >
          <svg width="30" height="30">
        <use href="/svg-sprite.svg#icon-delete" />
      </svg>
      </button>
    </div>
  );
}