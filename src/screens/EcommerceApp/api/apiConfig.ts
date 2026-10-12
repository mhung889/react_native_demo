import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

const TIMEOUT = 5000;

const api = axios.create({
  timeout: TIMEOUT,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  //   config.headers.set('Authorization', `Bearer ${getToken()}`);
  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => Promise.reject(error),
);
