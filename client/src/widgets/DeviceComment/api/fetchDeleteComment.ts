import { GenericAbortSignal } from 'axios';
import { $api } from 'shared/api';

export const fetchDeleteComment = async (
   deviceId: number,
   commentId: number,
   signal?: GenericAbortSignal | undefined,
) => {
   try {
      await $api.delete<void>(`/device/${deviceId}/comment/${commentId}`);
   } catch (e) {
      throw e;
   }
};
