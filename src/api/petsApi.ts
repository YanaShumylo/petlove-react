import api from './api';
import type { Pet} from '../types/pet';
import type { FullUser} from '../types/user';


export const addPet = async (pet:Pet) => {
    const response = await api.post<FullUser>(`/users/current/pets/add`, pet);
    return response.data;
};
export const removePet = async (petId: string) => {
    const response = await api.delete<FullUser>(`/users/current/pets/remove/${petId}`);
    return response.data;
};

