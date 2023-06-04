import { $api } from 'shared/api';

export const fetchDeleteComment = async (deviceId: number, commentId: number) => {
   try {
      await $api.delete<void>(`/device/${deviceId}/comment/${commentId}`);
   } catch (e) {
      console.log(e);
   }
};
