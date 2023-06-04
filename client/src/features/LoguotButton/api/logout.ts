import { $api } from 'shared/api';

export const authLogout = async () => {
   const response = await $api.post('/auth/logout');
   sessionStorage.setItem('accessToken', '');
   return response.data;
};
