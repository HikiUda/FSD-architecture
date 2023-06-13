import { StatementsAppTitles } from 'shared/model/StatementModel';
import styles from './styles.module.scss';
import { BrandTypeDropDown } from 'features/BrandTypeDropDown';
import { useBrands, useInput, useTypes } from 'shared/lib/hooks';
import { useEffect, useState } from 'react';
import { MainInput } from 'shared/ui/MainInput';
import { IDeviceInfo } from 'shared/model/DeviceModel';
import { fetchDevice } from 'shared/api/fetchDevice';
import { useParams } from 'react-router-dom';
import { SimpleButton } from 'shared/ui/SimpleButton';
import CrossSVG from 'shared/ui/SVGcomp';
import { SVGButton } from 'shared/ui/SVGButton';
import { AddSVG } from './../SVGComponent';

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

const DeviceEditor = () => {
   const { deviceId } = useParams();

   const [brandId, setBrandId] = useState<number>(0);
   const [typeId, setTypeId] = useState<number>(0);
   const [onSale, setOnSale] = useState<boolean>(false);
   const [info, setInfo] = useState<IDeviceInfo[]>([]);
   const [description, setDescription] = useState<string>('');

   const { value: brandSearchValue, changeValue: setBrandSearchValue } = useInput('');
   const { value: typeSearchValue, changeValue: setTypeSearchValue } = useInput('');
   const { value: price, changeValue: setPrice } = useInput('0руб.');
   const { value: quantity, changeValue: setQuantity } = useInput('');
   const { value: name, changeValue: setName } = useInput('');

   const { brands } = useBrands(brandSearchValue);
   const { types } = useTypes(typeSearchValue);

   useEffect(() => {
      if (deviceId) {
      }
      fetchDevice(1).then((data) => {
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
   }, []);

   return (
      <div>
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
            <MainInput value={price} setValue={setPrice} placeholder="Цена" />
            <MainInput value={quantity} setValue={setQuantity} placeholder="Количество" />
         </div>
         <div className={styles.description_block}>
            <h2 className={styles.small_title}>Описание</h2>
            <textarea
               value={description}
               onChange={(e: React.FormEvent<HTMLTextAreaElement>) =>
                  setDescription(e.currentTarget.value)
               }
               className={`${styles.description} perple-underline`}></textarea>
         </div>
         <div className={styles.row}>
            <input type="file" />
         </div>
         <div>
            <h2 className={styles.small_title}>Добавить больше информации</h2>
            <SimpleButton>Добавить</SimpleButton>
            <div className={styles.char_block}>
               {info.map((item) => {
                  return (
                     <div className={styles.char_item} key={item.id}>
                        <input
                           value={item.title}
                           className={`${styles.char_title} perple-underline`}
                        />
                        {item.description.map((desc) => {
                           return (
                              <div
                                 className={`${styles.char_value} perple-underline`}
                                 key={desc.id}>
                                 <input
                                    className={styles.char_input_value}
                                    value={desc.description}
                                 />

                                 <SVGButton moreClass={styles.char_del_value}>
                                    <CrossSVG />
                                 </SVGButton>
                              </div>
                           );
                        })}
                        <SVGButton>
                           <AddSVG />
                        </SVGButton>
                        <SimpleButton>Удалить</SimpleButton>
                     </div>
                  );
               })}
            </div>
         </div>
      </div>
   );
};

export default DeviceEditor;
