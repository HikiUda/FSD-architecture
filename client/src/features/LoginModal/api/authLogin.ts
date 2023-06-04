import { $api } from 'shared/api';
import { AuthResponse } from 'shared/model/AuthModel';

export const authLogin = async (email: string, password: string) => {
   try {
      const response = await $api.post<AuthResponse>('/auth/login', { email, password });
      sessionStorage.setItem('accessToken', response.data.tokens.accessToken);

      return response.data;
   } catch (e) {
      console.log(e);
   }
};
