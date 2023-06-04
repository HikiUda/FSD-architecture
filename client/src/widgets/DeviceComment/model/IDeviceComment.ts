export interface IDeviceComment {
   id: number;
   content: string;
   deviceId: number;
   userId: number;
   userName: string;
}

export interface IDeviceCommentsObj {
   count: number;
   comments: IDeviceComment[];
}
