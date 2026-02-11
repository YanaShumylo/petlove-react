import api from "./api";
import type { City } from "../types/city";

export const searchCities = async (keyword: string): Promise<City[]> => {
  const response = await api.get<City[]>("/cities", {
    params: { keyword },
  });

  return response.data;
};
