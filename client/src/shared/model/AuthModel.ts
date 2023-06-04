export interface IToken {
   accessToken: string;
   refreshToken: string;
}

export enum Roles {
   ADMIN = 'ADMIN',
   USER = 'USER',
   MAINADMIN = 'MAINADMIN',
   VENDOR = 'VENDOR',
}

export interface IUser {
   id: number;
   email: string;
   roles: string[];
}

export interface AuthResponse {
   user: IUser;
   tokens: IToken;
}
