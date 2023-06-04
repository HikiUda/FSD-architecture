import { $api } from 'shared/api';

export const fetcthToRate = (deviceId: number, rate: number) => {
   try {
      $api.put(`/device/${deviceId}/rate`, { rate });
   } catch (e) {
      console.log(e);
   }
};
