// import { useRef, useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { userApi } from '../../../api/userApi';
import Modal from '../Modal/Modal';
import type { FullUser } from '../../../types/user';
import css from './ModalEditUser.module.css';

interface ModalEditUserProps {
  onClose: () => void;
}

interface ModalEditUserFormValues {
  name: string;
  email: string;
  avatar?: string;
  phone?: string;
}

const schemaModalEditUser = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string()
    .required('Email is required')
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Invalid email'
    ),
  avatar: Yup.string()
    .notRequired()
    .matches(
      /^$|^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/,
      'Invalid avatar URL'
    ),
  phone: Yup.string()
    .notRequired()
    .matches(/^\+38\d{10}$/, 'Phone must be in format +380XXXXXXXXX'),
});

export default function ModalEditUser({ onClose }: ModalEditUserProps) {
  const queryClient = useQueryClient();
  const currentUser = queryClient.getQueryData<FullUser>(['currentUser']);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ModalEditUserFormValues>({
    resolver: yupResolver(schemaModalEditUser),
    defaultValues: {
      name: currentUser?.name ?? '',
      email: currentUser?.email ?? '',
      avatar: currentUser?.avatar ?? '',
      phone: currentUser?.phone ?? '',
    },
    mode: 'onBlur',
  });

  const avatarValue = watch('avatar') ?? '';

const mutation = useMutation<
  FullUser,
  AxiosError<{ message?: string }>,
  Partial<FullUser>
>({
  mutationFn: (data) => userApi.updateCurrent(data),

  onSuccess: (updatedUser) => {
    queryClient.setQueryData(['currentUser'], updatedUser);

    onClose();
    toast.success('Profile updated successfully');
  },

  onError: (error) => {
    toast.error(error.response?.data?.message || 'Update failed');
  },
});

  const onSubmit: SubmitHandler<ModalEditUserFormValues> = (data) => {
  const filteredData: Partial<FullUser> = Object.fromEntries(
    Object.entries(data).filter(([_, value]) => value !== '' && value !== undefined)
  );

    mutation.mutate(filteredData);
  };

  return (
    <Modal onClose={onClose}>

      <div className={css.wrapperModal}>
        <h4 className={css.title}>Edit information</h4>

     <div className={css.avatarWrapper}>
  {avatarValue ? (
    <img
      src={avatarValue}
      alt="Avatar"
      className={css.avatar}
    />
  ) : (
    <div className={css.avatarPlaceholder}>
      <svg width="94" height="94">
        <use href="/svg-sprite.svg#icon-user"  />
      </svg>
    </div>
          )}
    </div>
        <form className={css.form} onSubmit={handleSubmit(onSubmit)}>
          <div className={css.inputWrapper}>
              <input {...register('avatar')}placeholder="https://example.com/avatar.jpg"
              className={css.input}
            />
               {errors.avatar && <p className={css.error}>{errors.avatar.message}</p>}
          </div>

          <div className={css.inputWrapper}>
            <input {...register('name')} className={css.input} />
            {errors.name && <p className={css.error}>{errors.name.message}</p>}
          </div>

          <div className={css.inputWrapper}>
            <input {...register('email')} className={css.input} />
            {errors.email && <p className={css.error}>{errors.email.message}</p>}
          </div>

          <div className={css.inputWrapper}>
            <input {...register('phone')} className={css.input}  />
            {errors.phone && <p className={css.error}>{errors.phone.message}</p>}
          </div>

          <button
            type="submit"
            disabled={mutation.isPending}
            className={css.submitButton}
          >
            Go to profile
          </button>
        </form>
      </div>
    </Modal>
  );
}