import Config from 'react-native-config';
import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';

const TIMEOUT = 5000;

export const apiTopHeadLineConfig = axios.create({
  withCredentials: false,
  baseURL: Config.HEADLINE_BASE_URL,
  timeout: TIMEOUT,
});

export const apiSearchConfig = axios.create({
  withCredentials: false,
  baseURL: Config.SEARCH_BASE_URL,
  timeout: TIMEOUT,
});

apiTopHeadLineConfig.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.set('Authorization', Config.API_KEY);
  return config;
});

apiTopHeadLineConfig.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error),
);

apiSearchConfig.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  config.headers.set('X-Api-Key', Config.API_KEY);
  return config;
});

apiSearchConfig.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => Promise.reject(error),
);
