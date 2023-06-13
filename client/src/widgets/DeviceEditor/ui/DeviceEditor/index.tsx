import { StatementsAppTitles } from 'shared/model/StatementModel';
import styles from './styles.module.scss';
import { BrandTypeDropDown } from 'features/BrandTypeDropDown';
import { useBrands, useInput, useTypes } from 'shared/lib/hooks';
import { useEffect, useState } from 'react';
import { MainInput } from 'shared/ui/MainInput';
import { IDeviceInfo } from 'shared/model/DeviceModel';
import { fetchDevice } from 'shared/api/fetchDevice';
import { useNavigate, useParams } from 'react-router-dom';
import { SimpleButton } from 'shared/ui/SimpleButton';
import DeviceInfoEditor from '../DeviceInfoEditor';
import PriceInputEditor from '../DeviceMainEditor/PriceInputEditor';
import { P_USER_MYPRODUCT } from 'shared/lib/pathes';
import QuantityInputEditor from '../DeviceMainEditor/QuantityInputEditor';
import ImgEditor from '../DeviceMainEditor/ImgEditor';
import DescriptionEditor from '../DeviceMainEditor/DescriptionEditor';

//  interface IOneDevice {
//    id: number;
//    name: string;
//    description: string;
//    img: string;
//    rating: number;
//    price: number;
//    countOfPurches: number;
//    quantity: number;
//    onSale: boolean;
//    userId: number;
//    typeId: number;
//    brandId: number;
//    typeName: string;
//    brandName: string;
//    info: IDeviceInfo[] | null;
// }

interface DeviceEditorProps {
   callback: (deviceInfo: string, img: File) => void;
   buttonName: string;
}

const DeviceEditor: React.FC<DeviceEditorProps> = ({ callback, buttonName }) => {
   const { deviceId } = useParams();
   const navigate = useNavigate();

   const [brandId, setBrandId] = useState<number>(0);
   const [typeId, setTypeId] = useState<number>(0);
   const [onSale, setOnSale] = useState<boolean>(false);
   const [image, setImage] = useState<File | null>(null);
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
            setPrice(String(data.price));
            setQuantity(String(data.quantity));
            setBrandId(data.brandId);
            setTypeId(data.typeId);
            setBrandSearchValue(data.brandName);
            setTypeSearchValue(data.typeName);
            setDescription(data.description);
            setOnSale(data.onSale);
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
         return;
      }

      let convPrice = convertToNumber(price);
      let convQuantity = convertToNumber(quantity);
      if (!Number(convPrice) || !Number(convQuantity)) {
         return;
      }
      if (!image) {
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
   }

   return (
      <div>
         <SimpleButton onClick={() => navigate(P_USER_MYPRODUCT)} moreClass={styles.button}>
            Назад
         </SimpleButton>
         <h2 className={styles.title}>{StatementsAppTitles.app3}</h2>
         <div className={styles.row}>
            <MainInput value={name} setValue={setName} placeholder="Название товара..." />
            <BrandTypeDropDown
               placeholder="Поиск по брэнду..."
               list={brands}
               searchValue={brandSearchValue}
               setSearchValue={setBrandSearchValue}
               callback={(id: number) => setBrandId(id)}
            />
            <BrandTypeDropDown
               placeholder="Поиск по типу..."
               list={types}
               searchValue={typeSearchValue}
               setSearchValue={setTypeSearchValue}
               callback={(id: number) => setTypeId(id)}
            />
            <PriceInputEditor value={price} setValue={setPrice} />
            <QuantityInputEditor value={quantity} setValue={setQuantity} />
         </div>
         <DescriptionEditor description={description} setDescription={setDescription} />
         <ImgEditor image={image} setImage={setImage} />
         <DeviceInfoEditor info={info} setInfo={setInfo} />
         <div className={styles.row}>
            <input type="checkbox" checked={onSale} onChange={() => setOnSale((prev) => !prev)} />
            Продовать?
         </div>
         <div className={styles.row}>
            <SimpleButton onClick={sendData}>{buttonName}</SimpleButton>
         </div>
      </div>
   );
};

export default DeviceEditor;
