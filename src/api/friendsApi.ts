import api from "./api";
import type { Friend } from "../types/friend";

export const getFriends = async () => {
    const response = await api.get<Friend[]>('/friends')
    return response.data;
}