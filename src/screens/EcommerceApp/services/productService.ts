import { api } from '../api/apiConfig';

export const productServices = {
  getProductLists: async () => {
    const response = await api.get('/products');
    // console.log(response.data);
    return response.data.products || [];
  },

  getSingleProduct: async (id: number) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },
};
