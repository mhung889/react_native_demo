import { api } from '../api/apiConfig';

export const cartService = {
  addACart: async (userId: number, products: []) => {
    const reponse = await api.post('/carts/add', {
      userId,
      products,
    });
    return reponse.data;
  },

  //test cart
  updateCart: async (userId: number, products: []) => {
    const reponse = await api.put(`/carts/${userId}`, {
      products,
      merge: true,
    });
    return reponse.data;
  },
};
