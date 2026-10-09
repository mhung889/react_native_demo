import { apiSearchConfig } from './../api/config/apiConfig';
import axios from 'axios';

const PAGE_SIZE = 6;

export async function getDataSearch(pageNumber: number, searchTerm: string) {
  try {
    const response = await apiSearchConfig.get('', {
      params: {
        pageSize: PAGE_SIZE,
        page: pageNumber,
        q: searchTerm,
      },
    });
    return response.data.articles ?? [];
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      if (error.code === 'ETIMEOUT' || error.code === 'ECONNABORTED') {
        throw new Error('Yeu cau qua thoi gian, vui long thu lai');
      }
      if (!error.response) {
        throw new Error('Không thể kết nối. Kiểm tra mạng của bạn.');
      }
      //   console.log('Axios error:', error.message);
      //   console.log('Status:', error.response?.status);
      throw error;
    }
  }
}
