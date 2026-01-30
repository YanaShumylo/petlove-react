import type { ReactNode } from 'react';
import { AuthContext } from './AuthContext';
import { useCurrentUser, USER_QUERY_KEY } from '../hooks/useCurrentUser';
// import type { FullUser } from '../types/user';
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

  const { data: user } = useCurrentUser();

  const login = (userData: AuthResponse, token: string) => {
    localStorage.setItem('token', token);
    queryClient.setQueryData(USER_QUERY_KEY, userData);
  };

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
       queryClient.clear();
    }
  };

  return (
    <AuthContext.Provider
      value={{ user: user || null, isAuthenticated: Boolean(user), login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};