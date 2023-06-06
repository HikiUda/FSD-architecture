import { GenericAbortSignal } from 'axios';
import { $api } from 'shared/api';

export const fetchUpdateComment = async (
   deviceId: number,
   commentId: number,
   content: string,
   signal?: GenericAbortSignal | undefined,
) => {
   try {
      $api.put(`/device/${deviceId}/comment/${commentId}`, { content });
   } catch (e) {
      throw e;
   }
};
