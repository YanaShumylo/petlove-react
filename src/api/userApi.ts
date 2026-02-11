import api from './api';
import type { FullUser, User, UpdateUserData} from '../types/user';
    
export const userApi = {
  getCurrentUser: async () => {
    const response = await api.get<User>('/users/current');
    return response.data;
  },

  getCurrentFull: async () => {
    const response = await api.get<FullUser>(
      '/users/current/full'
    );
    return response.data;
  },
  
    updateCurrent: async(data:UpdateUserData) => {
    const response = await api.patch<FullUser>('/users/current/edit', data);
    return response.data;
  },
};
