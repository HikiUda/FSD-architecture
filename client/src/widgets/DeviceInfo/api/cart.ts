import { $api } from 'shared/api';
import { ICartDevice, IOneDeviceCart } from 'shared/model/DeviceModel';

export const fetchOneCartDevice = async (basketDeviceId: number) => {
   try {
      const response = await $api.get<ICartDevice>(`/basket/${basketDeviceId}`);
      return response.data;
   } catch (e) {
      console.log();
   }
};
export const fetchDeleteFromCart = async (basketDeviceId: number) => {
   try {
      $api.delete<number>(`/basket/${basketDeviceId}`);
   } catch (e) {
      console.log();
   }
};
export const fetchUpdateDeviceCart = async (basketDeviceId: number, deviceInfo: IOneDeviceCart) => {
   try {
      $api.put<number>(`/basket/${basketDeviceId}`, { deviceInfo });
   } catch (e) {
      console.log();
   }
};
