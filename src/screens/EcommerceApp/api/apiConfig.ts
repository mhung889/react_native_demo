import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import Config from 'react-native-config';

const TIMEOUT = 5000;

const URL_BASE = 'https://dummyjson.com';

export const api = axios.create({
  baseURL: URL_BASE,
  timeout: TIMEOUT,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  //   config.headers.set('Authorization', `Bearer ${getToken()}`);
  config.headers.set('Content-Type', 'application/json');
  config.headers.set('Accept', 'application/json');

  return config;
});

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  error => Promise.reject(error),
);
