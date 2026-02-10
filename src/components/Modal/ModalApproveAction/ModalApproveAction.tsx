import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';
import { authApi } from '../../../api/authApi';
import { useAuth } from '../../../hooks/useAuth';
import Modal from '../Modal/Modal';
import css from './ModalApproveAction.module.css';

interface Props {
  onClose: () => void;
}

export default function ModalApproveAction({ onClose }: Props) {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const { mutate: logoutMutation, isPending } = useMutation({
    mutationFn: () => authApi.logout(),

    onSuccess: () => {
      toast.success('Sign out success');
    },

    onError: (error: AxiosError<{ message?: string }>) => {
      toast.error(
        error.response?.data?.message || 'Sign out failed'
      );
    },

    onSettled: () => {
      logout();
      navigate('/', { replace: true });
    },
  });

  const handleYes = () => {
    onClose();          
    logoutMutation();  
  };

  return (
    <Modal onClose={onClose}>
      <div className={css.wrapper}>
        <img
          src="/avatar-cat.webp"
          alt="Image a cat"
          className={css.image}
        />

        <p className={css.text}>Already leaving?</p>

        <div className={css.buttons}>
          <button
            className={css.button}
            type="button"
            onClick={handleYes}
            disabled={isPending}
          >
            Yes
          </button>

          <button
            className={css.button}
            type="button"
            onClick={onClose}
            disabled={isPending}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
