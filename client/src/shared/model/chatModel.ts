export interface IChat {
   id: number;
   withAdmin: boolean;
   name: string;
   createdAt: string;
}

export interface IChatMessege {
   id: number;
   userId: number;
   text: string;
   isRead: boolean;
   createdAt: string;
}
