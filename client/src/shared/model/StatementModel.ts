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
   adminComment: string;
}

export interface IStatements {
   count: number;
   statements: IOneShortStatement[];
}

export enum StatementsAppTitles {
   app1 = 'Заявление на становление Админом',
   app2 = 'Заявление на становление Продовцом',
   app3 = 'Заявление на создие девайса',
   app4 = 'Заявление на создание бренда',
   app5 = 'Заявление на создание типа',
}
export enum StatementsAppNumbers {
   app1 = 1,
   app2 = 2,
   app3 = 3,
   app4 = 4,
   app5 = 5,
}
