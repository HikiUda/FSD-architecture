import { IisLiked } from 'shared/model/LIkedModel';
import { $api } from './base';

export const fetchChangeLiked = async (deviceId: number | string) => {
   try {
      await $api.post<any>(`/user/liked/${deviceId}`);
   } catch (e) {
      throw e;
   }
};
export const fetchIsLiked = async (deviceId: number | string) => {
   try {
      const response = await $api.get<IisLiked>(`/user/liked/${deviceId}`);

      return response.data;
   } catch (e) {
      throw e;
   }
};
