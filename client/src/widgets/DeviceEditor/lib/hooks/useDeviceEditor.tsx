import { useBrands, useInput, useTypes } from 'shared/lib/hooks';
import { useEffect, useState } from 'react';
import { IDeviceInfo } from 'shared/model/DeviceModel';
import { fetchDevice } from 'shared/api/fetchDevice';

const DeviceEditor = (
   deviceId: string | number | undefined,
   callback: (deviceInfo: string, img: File | string) => void,
) => {
   const [error, setError] = useState<string>('');
   const [brandId, setBrandId] = useState<number>(0);
   const [typeId, setTypeId] = useState<number>(0);
   const [onSale, setOnSale] = useState<boolean>(false);
   const [image, setImage] = useState<File | null | string>(null);
   const [info, setInfo] = useState<IDeviceInfo[]>([]);
   const [description, setDescription] = useState<string>('');

   const { value: brandSearchValue, changeValue: setBrandSearchValue } = useInput('');
   const { value: typeSearchValue, changeValue: setTypeSearchValue } = useInput('');
   const { value: price, changeValue: setPrice } = useInput('0руб.');
   const { value: quantity, changeValue: setQuantity } = useInput('0 шт.');
   const { value: name, changeValue: setName } = useInput('');

   const { brands } = useBrands(brandSearchValue);
   const { types } = useTypes(typeSearchValue);

   useEffect(() => {
      if (!!Number(deviceId)) {
         fetchDevice(Number(deviceId)).then((data) => {
            setName(data.name);
            setPrice(data.price + 'руб.');
            setQuantity(data.quantity + ' шт.');
            setBrandId(data.brandId);
            setTypeId(data.typeId);
            setBrandSearchValue(data.brandName);
            setTypeSearchValue(data.typeName);
            setDescription(data.description);
            setOnSale(data.onSale);
            setImage(data.img);
            if (data?.info) {
               setInfo(data.info);
            }
         });
      }
   }, []);

   function convertToNumber(str: string) {
      return Number(str.match(/\d*/));
   }

   function sendData() {
      if (!name || !brandId || !typeId || !brandSearchValue || !typeSearchValue || !description) {
         setError('Заполните все поля!');
         return;
      }

      let convPrice = convertToNumber(price);
      let convQuantity = convertToNumber(quantity);
      if (!Number(convPrice) || !Number(convQuantity)) {
         setError('Заполните все поля!');
         return;
      }
      if (!image) {
         setError('Заполните все поля!');
         return;
      }

      let isError = false;

      info.forEach((item) => {
         if (!item.title) {
            isError = true;
            return;
         }
         if (item.description.length === 0) {
            isError = true;
            return;
         }
         item.description.forEach((desc) => {
            if (!desc.description) {
               isError = true;
               return;
            }
         });
      });

      if (isError) {
         setError('Заполните все поля!');
         return;
      }

      const data = {
         name,
         price: convPrice,
         brandId,
         brandName: brandSearchValue,
         typeId,
         typeName: typeSearchValue,
         onSale,
         info,
         description,
         quantity: convQuantity,
      };
      const deviceInfo = JSON.stringify(data);

      callback(deviceInfo, image);
      setError('');
   }

   return {
      brandId,
      setBrandId,
      typeId,
      setTypeId,
      onSale,
      setOnSale,
      image,
      setImage,
      info,
      setInfo,
      description,
      setDescription,
      brandSearchValue,
      setBrandSearchValue,
      typeSearchValue,
      setTypeSearchValue,
      price,
      setPrice,
      quantity,
      setQuantity,
      name,
      setName,
      brands,
      types,
      sendData,
      error,
   };
};

export default DeviceEditor;
