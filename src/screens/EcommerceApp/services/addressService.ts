import axios from 'axios';

export const addressService = {
  getListProvinces: async () => {
    const reponse = await axios.get(`https://provinces.open-api.vn/api/v2/p/`, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return reponse.data;
  },

  // https://provinces.open-api.vn/api/v2/w/?province=1
  getListWardsByProvinceCode: async (id: number) => {
    const response = await axios.get(`https://provinces.open-api.vn/api/v2/w/`, {
      params: {
        province: id,
      },
    });
    return response.data;
  },
};
