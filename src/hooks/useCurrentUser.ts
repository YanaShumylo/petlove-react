import { useQuery } from '@tanstack/react-query';
import { userApi } from '../api/userApi';
import type {FullUser } from '../types/user';

export const USER_QUERY_KEY: readonly string[] = ['currentUser'];
const token = localStorage.getItem('token');

export function useCurrentUser() {
  return useQuery<FullUser>({
    queryKey: USER_QUERY_KEY,
    queryFn: userApi.getCurrentFull,
    enabled: !!token,
    retry: false,
  });
}