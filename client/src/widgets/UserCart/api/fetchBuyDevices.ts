import { $api } from 'shared/api';

export const fetchBuyDevcies = async () => {
   try {
      await $api.post<void>('/user/purches');
   } catch (e) {
      console.log(e);
   }
};
