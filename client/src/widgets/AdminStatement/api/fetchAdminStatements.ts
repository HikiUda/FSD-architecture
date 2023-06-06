import { GenericAbortSignal } from 'axios';
import { $api } from 'shared/api';
import { IStatements, StatementsStates } from 'shared/model/StatementModel';

interface Params {
   limit: number;
   page: number;
   date?: string;
   state?: StatementsStates;
   appNumber?: number;
   userId?: number;
}

export const fetchAdminStatements = async (
   params: Params,
   signal?: GenericAbortSignal | undefined,
) => {
   try {
      const response = await $api.get<IStatements>('/statement', { params, signal });
      return response.data;
   } catch (e) {
      throw e;
   }
};
