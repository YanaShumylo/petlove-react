import api from './api';
import type { Category, Species, Sex, NoticeListItem, NoticeDetails  } from "../types/notices";

export interface GetNoticesParams {
  keyword?: string;
  category?: Category;
  species?: Species;
  sex?: Sex;
  locationId?: string;
  byDate?: boolean;
  byPrice?: boolean;
  byPopularity?: boolean;
  page?: number;
  limit?: number;
}

interface NoticesHttpResponse{
    results: NoticeListItem[];
    totalPages: number;
    page: number;
    perPage: number;
}

interface FavoritesResponse {
  favorites: string[];
}

export const getNotices = async ({
  keyword,
  category,
  species,
  sex,
  locationId,
  byDate = true,
  byPrice,
  byPopularity,
  page = 1,
  limit = 6,
}: GetNoticesParams = {}): Promise<NoticesHttpResponse> => {
  const response = await api.get<NoticesHttpResponse>(
    '/notices',
    {
      params: {
        ...(keyword?.trim() ? { keyword } : {}),
        ...(category ? { category } : {}),
        ...(species ? { species } : {}),
        ...(sex ? { sex } : {}),
        ...(locationId ? { locationId } : {}),
        ...(byDate !== undefined ? { byDate } : {}),
        ...(byPrice !== undefined ? { byPrice } : {}),
        ...(byPopularity !== undefined ? { byPopularity } : {}),
        page,
        limit,
      },
    }
  );
  return response.data;
};

export const getNoticesId = async (_id: string): Promise<NoticeDetails> => {
  const response = await api.get<NoticeDetails>(`/notices/${_id}`);
  return response.data;
};

export const addFavorite = async (
  id: string
): Promise<FavoritesResponse> => {
  const response = await api.post<FavoritesResponse>(
    `/notices/favorites/add/${id}`
  );
  return response.data;
};

export const removeFavorite = async (
  id: string
): Promise<FavoritesResponse> => {
  const response = await api.delete<FavoritesResponse>(
    `/notices/favorites/remove/${id}`
  );
  return response.data;
};
