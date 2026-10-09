import { apiTopHeadLineConfig } from '../api/config/apiConfig';
import axios from 'axios';

const PAGE_SIZE = 6;

export async function getDataTopHeadlines(page: number, category: string) {
  try {
    const response = await apiTopHeadLineConfig.get('', {
      params: {
        page,
        category,
        pageSize: PAGE_SIZE,
      },
    });
    return response.data.articles ?? [];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code == 'ETIMEOUT' || error.code == 'ECONNABORTED') {
        throw new Error('Yeu cau qua thoi gian, vui long thu lai');
      }

      if (!error.response) {
        throw new Error('Không thể kết nối. Kiểm tra mạng của bạn.');
      }
      throw error;
    }
  }
}
