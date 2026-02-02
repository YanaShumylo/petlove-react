import api from './api';
import type { SignupPayload, AuthResponse } from '../types/auth';

export const authApi = {
  getToken: () => localStorage.getItem('token'),

  signup: async (payload: SignupPayload) => {
    const response  = await api.post<AuthResponse>('/users/signup',  payload);
    return response.data;
  },

  signin: async (payload: { email: string; password: string }) => {
    const response = await api.post<AuthResponse>('/users/signin',  payload);
    return response.data;
  },

  logout: async () => {
    return api.post('/users/signout');
  },
};