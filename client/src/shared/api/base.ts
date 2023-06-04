import axios from 'axios';
import { AuthResponse } from 'shared/model/AuthModel';

export const BASE_URL = 'http://localhost:5000';

const API_URL = `${BASE_URL}/api`;

export const $api = axios.create({ baseURL: API_URL, withCredentials: true });

$api.interceptors.request.use((config) => {
   const accessToken = sessionStorage.getItem('accessToken') || '';
   config.headers.Authorization = `Bearer ${accessToken}`;
   return config;
});

$api.interceptors.response.use(
   (config) => {
      return config;
   },
   async (error) => {
      const originalRequest = error.config;
      if (error.response.status === 401 && error.config && !error.config._isRetry) {
         originalRequest._isRetry = true;
         try {
            fetchIsAuth();
            return $api.request(originalRequest);
         } catch (e) {
            console.log('Unauthorize');
         }
      }
   },
);

export const fetchIsAuth = async () => {
   try {
      const response = await axios.get<AuthResponse>(`${API_URL}/auth/refresh`, {
         withCredentials: true,
      });

      sessionStorage.setItem('accessToken', response.data.tokens.accessToken);
      return response.data;
   } catch (e) {
      console.log(e);
      return;
   }
};
