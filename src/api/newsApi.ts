import api from './api';
import type { New } from "../types/new";

interface GetNewsParams{
    keyword?: string;
    page?: number;
    limit?: number;
}

interface NewsHttpResponse{
  results: New[];
  totalPages: number;
  page: number;
  perPage: number;
}

export const getNews = async ({ keyword, page = 1, limit = 6 }: GetNewsParams): Promise<NewsHttpResponse> => {
    const response = await api.get<NewsHttpResponse>('/news',
        {
            params: {
                ...(keyword?.trim() ? { keyword } : {}),
                page,
                limit,
            },
        }
    );
    return response.data;
};
