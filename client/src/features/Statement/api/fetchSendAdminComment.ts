import { $api } from 'shared/api';

export const fetchSendAdminComment = async (statementId: number, content: string) => {
   try {
      const response = await $api.put<any>(`/statement/admin-comment/${statementId}`, { content });
      return response.data;
   } catch (e) {
      throw e;
   }
};
