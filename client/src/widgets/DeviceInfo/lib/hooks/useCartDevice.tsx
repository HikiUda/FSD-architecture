import { useState, useEffect } from 'react';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { ICartDevice } from 'shared/model/DeviceModel';
import { fetchDeleteFromCart, fetchOneCartDevice, fetchUpdateDeviceCart } from '../../api/cart';
import { useNavigate } from 'react-router-dom';
import { P_USER_CART } from 'shared/lib/pathes';

const useCartDevice = (id: number) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [device, setDevice] = useState<ICartDevice | null>(null);
   const [isSave, setIsSave] = useState<boolean>(false);
   const navigate = useNavigate();

   function saveChanges() {
      if (device) {
         fetchUpdateDeviceCart(id, device.deviceInfo);
         setIsSave(true);
         setTimeout(() => {
            setIsSave(false);
         }, 3000);
      }
   }

   function deleteFromCart() {
      if (device) {
         fetchDeleteFromCart(id);
         navigate(P_USER_CART);
      }
   }

   useEffect(() => {
      setLoading(true);
      setError('');
      fetchOneCartDevice(id)
         .then((data) => {
            setDevice(data);
         })
         .catch((e) => {
            setError(e.message || TempErrorText);
         })
         .finally(() => {
            setLoading(false);
         });
   }, [id]);

   return { device, loading, error, deleteFromCart, saveChanges, isSave };
};

export default useCartDevice;
