export interface IDeviceInfoDescription {
   description: string | number;
   selected: boolean;
   id: number;
}

export interface IDeviceInfo {
   id: number;
   title: string;
   description: IDeviceInfoDescription[];
}

export interface IOneDevice {
   id: number;
   name: string;
   description: string;
   img: string;
   rating: number;
   price: number;
   countOfPurches: number;
   quantity: number;
   onSale: boolean;
   userId: number;
   typeId: number;
   brandId: number;
   typeName: string;
   brandName: string;
   info: IDeviceInfo[] | null;
}
export interface IDevices {
   count: number;
   devices: IOneDevice[];
}

export interface IOneDeviceCart extends IOneDevice {
   forPurches: number;
}

export interface ICartDevice {
   basketDeviceId: number;
   deviceInfo: IOneDeviceCart;
}
export interface IPurchesDevice {
   purchesId: number;
   deviceInfo: IOneDeviceCart;
}
