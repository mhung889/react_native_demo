import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

const TIMEOUT = 15000;

const URL_BASE = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: URL_BASE,
  timeout: TIMEOUT,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.set('Content-Type', 'application/json');
  config.headers.set('Accept', 'application/json');
  // kiểm tra xem có accessTK kok? có thì mới set
  //   config.headers.set('Authorization', `Bearer ${getToken()}`);
  config.headers['X-custom-header'] = 'i am hung test interceptors';
  console.log(config);
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response, // data ngon, trả về cho app sử dụng luôn
  (error) => Promise.reject(error),
);

/*
  Cách xử lý refreshToken
*/

/*

// Biến cờ hiệu và hàng đợi
let isRefreshing = false;
let refreshSubscribers = [];

// Hàm gom những request đến sau vào hàng đợi
const subscribeTokenRefresh = (cb) => {
  refreshSubscribers.push(cb);
};

// Hàm chạy lại toàn bộ request trong hàng đợi sau khi có token mới
const onRerefreshed = (token) => {
  refreshSubscribers.map((cb) => cb(token));
  refreshSubscribers = []; // Chạy xong thì xóa hàng đợi
};

// --- RESPONSE INTERCEPTOR ---
apiClient.interceptors.response.use(
  (response) => {
    return response; // Data ngon, trả về cho app xài
  },
  async (error) => {
    const {
      config,
      response: { status },
    } = error;
    const originalRequest = config;

    // Nếu lỗi 401 và request này chưa từng được retry
    if (status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        // TÌNH HUỐNG: Đang có một request khác đi xin token rồi.
        // Giải pháp: Bắt request này hóa đá (trả về một Promise chưa resolve),
        // nhét nó vào hàng đợi. Khi nào có token mới thì nhét vào Header và chạy lại.
        return new Promise((resolve) => {
          subscribeTokenRefresh((newToken) => {
            originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
            resolve(apiClient(originalRequest));
          });
        });
      }

      originalRequest._retry = true; // Đánh dấu là tao đang đi retry đây
      isRefreshing = true; // Phất cờ khóa mõm các request đến sau

      try {
        // Gọi API xin token mới
        const rs = await axios.post('https://api.vibecoder.com/v1/refresh-token', {
          refreshToken: getRefreshTokenFromStorage(), // Lấy từ localStorage hoặc Cookie
        });
        
        // Lưu token mới vào bộ nhớ
        saveAccessTokenToStorage(newToken);

        // Thông báo cho các request đang xếp hàng: "Có hàng mới rồi anh em ơi, chạy đi!"
        isRefreshing = false;
        onRerefreshed(newToken);

        // Gắn token mới vào request đầu tiên này và chạy lại
        originalRequest.headers['Authorization'] = 'Bearer ' + newToken;
        return apiClient(originalRequest);
      } catch (_error) {
        // TÌNH HUỐNG: Refresh Token cũng hết hạn nốt! (Ví dụ: Qua 30 ngày)
        // Cạn lời. Xóa hết data, đá user về trang Login.
        isRefreshing = false;
        refreshSubscribers = [];
        clearStorage();
        window.location.href = '/login';
        return Promise.reject(_error);
      }
    }

    return Promise.reject(error);
  },
);

*/
