import { GenericAbortSignal } from 'axios';
import { $api } from 'shared/api';
import { IStatements, StatementsAppNumbers, StatementsStates } from 'shared/model/StatementModel';

export interface IStatementsParams {
   limit: number;
   page: number;
   date?: string;
   state?: StatementsStates | null;
   appNumber?: StatementsAppNumbers | null;
   userId?: number | null;
}

export const fetchAdminStatements = async (
   params: IStatementsParams,
   signal?: GenericAbortSignal | undefined,
) => {
   try {
      const response = await $api.get<IStatements>('/statement', { params, signal });
      return response.data;
   } catch (e) {
      throw e;
   }
};
