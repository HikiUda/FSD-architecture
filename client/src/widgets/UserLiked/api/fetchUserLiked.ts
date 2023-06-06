import { $api } from 'shared/api';
import { IOneDevice } from 'shared/model/DeviceModel';

export const fetchUserLiked = async () => {
   try {
      const response = await $api.get<IOneDevice[]>('/user/liked');
      return response.data;
   } catch (e) {
      throw e;
   }
};
