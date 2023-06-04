import { IisLiked } from 'shared/model/LIkedModel';
import { $api } from './base';

export const fetchChangeLiked = (deviceId: number | string) => {
   $api.post<void>(`/user/liked/${deviceId}`);
};
export const fetchIsLiked = async (deviceId: number | string) => {
   try {
      const response = await $api.get<IisLiked>(`/user/liked/${deviceId}`);

      return response.data;
   } catch (e) {
      console.log(e);
   }
};
