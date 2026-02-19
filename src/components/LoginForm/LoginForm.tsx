import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useNavigate, Link } from "react-router-dom";
import { AxiosError } from "axios";
import toast from "react-hot-toast";
import { authApi } from "../../api/authApi";
import { useAuth } from "../../hooks/useAuth";
import css from "./LoginForm.module.css";

interface LoginFormValues{
    email: string;
    password: string;
}

const validationSchema = Yup.object({
        email: Yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format').required('Email is required'),
          password: Yup.string()
    .min(7, 'Password must be at least 7 characters')
    .required('Password is required'),
    })

const defaultValues: LoginFormValues = {
    email: '',
    password:'',
};

export default function LoginForm() {
    const navigate = useNavigate();
  const { login } = useAuth();
  const queryClient = useQueryClient();
  const [showPassword, setShowPassword] = useState(false);
    
  const {
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
    reset,
    } = useForm<LoginFormValues>({
    resolver: yupResolver(validationSchema),
    defaultValues,
    mode: 'onBlur',
    });
    
  const mutation = useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      authApi.signin(data),
    onSuccess: (data) => {
      login(data, data.token);
      reset();
      toast.success('Login successful');
      navigate('/profile', { replace: true });
      queryClient.invalidateQueries({ queryKey: ['currentUser'] });
    },
    onError: (error: AxiosError<{ message?: string }>) => {
      const message =
        error.response?.data?.message ||
        (error.response?.status === 401
          ? 'Invalid email or password'
          : 'Login failed');
      toast.error(message);
    },
  });

  const { mutate, isPending  } = mutation;

    const getInputClass = (name: keyof LoginFormValues) => {
        if (errors[name]) return `${css.input} ${css.inputError}`;
        if (dirtyFields[name]) return `${css.input} ${css.inputSuccess}`;
        return css.input;
    };

    const renderStatusIcon = (
        field: keyof LoginFormValues
    ) => {
        if (errors[field]) {
            return (
                <svg className={css.iconError} width={18} height={18}>
                    <use href="/svg-sprite.svg#icon-cross-small" />
                </svg>);
        }
        if (dirtyFields[field]) {
            return (
                <svg className={css.iconSuccess} width={18} height={18}>
                    <use href="/svg-sprite.svg#icon-check" />
                </svg>);
        }
        return null;
    };

        const onSubmit = async (data: LoginFormValues) =>{
            mutate({
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
            onClick={() => setShowPassword(prev => !prev)}
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

      </div>
      <button
        type="submit"
        className={css.submitButton}
        disabled={isPending}
      >
        {isPending ? 'Log in...' : 'LOG IN'}
      </button>
      
        <p className={css.text}>
          Don't have an account?
          <Link to="/register" className={css.linkPage}> Register</Link>
      </p>
      
    </form>
  );
}