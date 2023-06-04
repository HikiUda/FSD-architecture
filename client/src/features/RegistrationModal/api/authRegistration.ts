import { $api } from 'shared/api';
import { AuthResponse } from 'shared/model/AuthModel';

export const authRegistration = async (email: string, password: string) => {
   try {
      const response = await $api.post<AuthResponse>('/auth/registration', { email, password });
      sessionStorage.setItem('accessToken', response.data.tokens.accessToken);
      return response.data;
   } catch (e) {
      console.log(e);
   }
};
