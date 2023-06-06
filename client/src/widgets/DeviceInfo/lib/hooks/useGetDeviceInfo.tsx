import { useState, useEffect } from 'react';
import { fetchAddInCart, fetchChangeLiked, fetchIsLiked } from 'shared/api';
import { fetchDevice } from 'shared/api/fetchDevice';
import { TempErrorText } from 'shared/lib/helpers/textTemplates';
import { useAppSelector } from 'shared/lib/hooks';
import { IOneDevice } from 'shared/model/DeviceModel';

const useGetDeviceInfo = (id: number) => {
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string>('');
   const [device, setDevice] = useState<IOneDevice | null>(null);
   const [isLiked, setIsLiked] = useState<boolean>(false);
   const [isAdded, setIsAdded] = useState<boolean>(false);
   const { auth } = useAppSelector((state) => state.user);

   function changeIsLiked() {
      fetchChangeLiked(id).catch((e) => {
         setError(e.message || TempErrorText);
      });
      setIsLiked((prev) => !prev);
   }
   function addInCart() {
      if (device) {
         fetchAddInCart(id, { ...device, forPurches: 1 }).catch((e) => {
            setError(e.message || TempErrorText);
         });
         setIsAdded(true);
         setTimeout(() => {
            setIsAdded(false);
         }, 3000);
      }
   }

   useEffect(() => {
      setLoading(true);
      setError('');
      fetchDevice(id)
         .then((data) => {
            setDevice(data);
         })
         .catch((e) => {
            setError(e.message || TempErrorText);
         })
         .finally(() => {
            setLoading(false);
         });
      if (auth) {
         fetchIsLiked(id)
            .then((data) => {
               setIsLiked(data.isLiked);
            })
            .catch((e) => {
               setError(e.message || TempErrorText);
            });
      }
   }, [id, auth]);

   return { device, loading, error, isLiked, isAdded, addInCart, changeIsLiked };
};

export default useGetDeviceInfo;
