import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useCurrentUser, USER_QUERY_KEY } from '../hooks/useCurrentUser';
import type { FullUser } from '../types/user';
import { useState } from 'react';
import type { AuthResponse } from '../types/auth';
import { authApi } from '../api/authApi';
import {useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import type { AxiosError } from 'axios';

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const queryClient = useQueryClient();
  const [userState, setUserState] = useState<FullUser | null>(null);

  useCurrentUser({
    onSuccess: (data) => {
      setUserState(data ?? null);
    },
    onError: () => {
      setUserState(null);
    },
  });

  function login(userData: AuthResponse, token: string) {
    localStorage.setItem('token', token);
    queryClient.setQueryData(USER_QUERY_KEY, userData as FullUser);
    setUserState(userData as FullUser);
  }

  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      const axiosError = error as AxiosError<{ message?: string }>;
      toast.error(
        axiosError.response?.data?.message || 'Sign out failed'
      );
    } finally {
      localStorage.removeItem('token');
      queryClient.removeQueries({ queryKey: USER_QUERY_KEY });
      setUserState(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user: userState, isAuthenticated: Boolean(userState), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};