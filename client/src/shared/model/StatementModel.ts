export enum StatementsStates {
   PENDING = 'pending',
   REJECTED = 'rejected',
   ACCEPT = 'accept',
}

export interface IOneShortStatement {
   id: number;
   title: string;
   state: StatementsStates;
   appNumber: number;
   userId: number;
}

export interface IOneStatement extends IOneShortStatement {
   info: string;
   description: string;
   userName: string;
   appNumber: number;
   createdAt: string;
}

export interface IStatements {
   count: number;
   statements: IOneShortStatement[];
}
