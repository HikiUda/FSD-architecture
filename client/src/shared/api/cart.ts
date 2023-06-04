import { IOneDeviceCart } from 'shared/model/DeviceModel';
import { $api } from './base';
import { IInCart } from 'shared/model/CartModel';

export const fetchAddInCart = async (deviceId: number, deviceInfo: IOneDeviceCart | null) => {
   try {
      $api.post<void>('/basket', { deviceId, deviceInfo });
   } catch (e) {
      console.log();
   }
};

export const fetchInCart = async (deviceId: number) => {
   try {
      const response = await $api.get<IInCart>(`/basket/have/${deviceId}`);
      return response.data;
   } catch (e) {
      console.log();
   }
};
