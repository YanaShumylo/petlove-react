import api from './api';
import type { FullUser} from '../types/user';

export const petsApi = async (petId: string) => {
    const response = await api.delete<FullUser>(`/users/current/pets/remove/${petId}`);
    return response.data;
};

