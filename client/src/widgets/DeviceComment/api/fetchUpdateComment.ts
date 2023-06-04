import { $api } from 'shared/api';

export const fetchUpdateComment = async (deviceId: number, commentId: number, content: string) => {
   try {
      $api.put(`/device/${deviceId}/comment/${commentId}`, { content });
   } catch (e) {
      console.log(e);
   }
};
