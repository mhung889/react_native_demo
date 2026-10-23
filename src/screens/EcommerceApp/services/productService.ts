import { api } from '../api/apiConfig';

export const productServices = {
  getProductLists: async (limit: number, skip: number) => {
    const response = await api.get('/products', {
      params: {
        limit,
        skip,
      },
    });
    return response.data.products || [];
  },

  getSingleProduct: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  getCategoryList: async () => {
    const response = await api.get('/products/category-list');
    return response.data;
  },

  getProductByCategory: async (categoryName: string, limit: number, skip: number) => {
    const response = await api.get(`/products/category/${categoryName}`, {
      params: {
        limit,
        skip,
      },
    });

    return response.data.products;
  },

  getAllProductsByCategory: async (categoryName: string) => {
    const response = await api.get(`/products/category/${categoryName}`, { params: { limit: 0 } });

    return response.data.products;
  },
};
