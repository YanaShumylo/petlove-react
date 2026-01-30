import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useNavigate, Link } from 'react-router-dom';
import { AxiosError } from 'axios';
import toast from 'react-hot-toast';
import { authApi } from '../../api/authApi';
import { useAuth } from '../../hooks/useAuth';
import css from './RegistrationForm.module.css';

interface RegisterFormValues {
  name: string;
  email: string;
  password: string;
  confirm: string;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Name is required'),

  email: Yup.string()
    .matches(
      /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
      'Invalid email format'
    )
    .required('Email is required'),

  password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),

  confirm: Yup.string()
    .oneOf([Yup.ref('password')], 'Passwords must match')
    .required('Confirm password is required'),
});

const defaultValues: RegisterFormValues = {
  name: '',
  email: '',
  password: '',
  confirm: '',
};

export default function RegistrationForm() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onBlur',
  });

    const mutation = useMutation ({
    mutationFn: authApi.signup, 
      onSuccess: (data) => {
      login(data, data.token);
      reset();
      toast.success('Registration successful');
      navigate('/profile', { replace: true });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ||
        (error.response?.status === 409
          ? 'Such email already exists'
          : 'Registration failed');
      toast.error(message);
    },
    });
  
  const { mutate, isPending } = mutation;

  const getInputClass = (name: keyof RegisterFormValues) => {
    if (errors[name]) return `${css.input} ${css.inputError}`;
    if (dirtyFields[name]) return `${css.input} ${css.inputSuccess}`;
    return css.input;
  };

  const renderStatusIcon = (
    field: keyof RegisterFormValues
  ) => {
    if (errors[field]) {
      return (
        <svg className={css.iconError} width={18} height={18}>
          <use href="/svg-sprite.svg#icon-cross-small" />
        </svg>
      );
    }

    if (dirtyFields[field]) {
      return (
        <svg className={css.iconSuccess} width={18} height={18}>
          <use href="/svg-sprite.svg#icon-check" />
        </svg>
      );
    }

    return null;
  };

  const onSubmit = (data: RegisterFormValues) => {
    mutate({
      name: data.name,
      email: data.email,
      password: data.password,
    });
  };

  return (
    <form
      className={css.form}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <div className={css.wrapperFormInput}>
   
      <div className={css.formGroup}>
        <div className={css.inputWrapper}>
          <input
            type="text"
            placeholder="Name"
            className={getInputClass('name')}
            {...register('name')}
          />
          {renderStatusIcon('name')}
        </div>
        <p className={css.error}>{errors.name?.message}</p>
      </div>

      <div className={css.formGroup}>
        <div className={css.inputWrapper}>
          <input
            type="email"
            placeholder="Email"
            className={getInputClass('email')}
            {...register('email')}
          />
          {renderStatusIcon('email')}
        </div>
        <p className={css.error}>{errors.email?.message}</p>
      </div>

      <div className={css.formGroup}>
        <div className={css.inputWrapper}>
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            className={getInputClass('password')}
            {...register('password')}
          />

          <svg
            className={css.eyeIcon}
            width={18}
            height={18}
            onClick={() => setShowPassword((prev) => !prev)}
          >
            <use
              href={
                showPassword
                  ? '/svg-sprite.svg#icon-eye'
                  : '/svg-sprite.svg#icon-eye-off'
              }
            />
          </svg>

          {renderStatusIcon('password')}
        </div>
        <p className={css.error}>{errors.password?.message}</p>
      </div>

      <div className={css.formGroup}>
  <div className={css.inputWrapper}>
    <input
      type={showPassword ? 'text' : 'password'}
      placeholder="Confirm password"
      className={getInputClass('confirm')}
      {...register('confirm')}
    />

    <svg
      className={css.eyeIcon}
      width={18}
      height={18}
      onClick={() => setShowPassword((prev) => !prev)}
    >
      <use
        href={
          showPassword
            ? '/svg-sprite.svg#icon-eye'
            : '/svg-sprite.svg#icon-eye-off'
        }
      />
    </svg>

    {renderStatusIcon('confirm')}
  </div>
  <p className={css.error}>{errors.confirm?.message}</p>
      </div>
      </div>
      <button
        type="submit"
        className={css.submitButton}
        disabled={isPending}
      >
        {isPending? 'Registration...' : 'REGISTRATION'}
      </button>
      
        <p className={css.text}>
          Already have an account?
          <Link to="/login" className={css.linkPage}> Log In</Link>
      </p>
      
    </form>
  );
}