import styles from './styles.module.scss';
import { BrandTypeDropDown } from 'features/BrandTypeDropDown';
import { MainInput } from 'shared/ui/MainInput';
import { useNavigate, useParams } from 'react-router-dom';
import { SimpleButton } from 'shared/ui/SimpleButton';
import DeviceInfoEditor from '../DeviceInfoEditor';
import PriceInputEditor from '../DeviceMainEditor/PriceInputEditor';
import { P_USER_MYPRODUCT } from 'shared/lib/pathes';
import QuantityInputEditor from '../DeviceMainEditor/QuantityInputEditor';
import ImgEditor from '../DeviceMainEditor/ImgEditor';
import DescriptionEditor from '../DeviceMainEditor/DescriptionEditor';
import useDeviceEditor from '../../lib/hooks/useDeviceEditor';

interface DeviceEditorProps {
   callback: (deviceInfo: string, img: File | string) => void;
   buttonName: string;
   title: string;
}

const DeviceEditor: React.FC<DeviceEditorProps> = ({ callback, buttonName, title }) => {
   const { deviceId } = useParams();
   const navigate = useNavigate();

   const {
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
   } = useDeviceEditor(deviceId, callback);

   return (
      <div>
         <SimpleButton onClick={() => navigate(P_USER_MYPRODUCT)} moreClass={styles.button}>
            Назад
         </SimpleButton>

         <h2 className={styles.title}>{title}</h2>
         <div className={styles.row}>
            <h4 className={styles.small_title}>Название:</h4>

            <MainInput value={name} setValue={setName} placeholder="Название товара..." />
         </div>
         <div className={styles.row}>
            <h4 className={styles.small_title}>Брэнд:</h4>

            <BrandTypeDropDown
               placeholder="Поиск по брэнду..."
               list={brands}
               searchValue={brandSearchValue}
               setSearchValue={setBrandSearchValue}
               callback={(id: number) => setBrandId(id)}
            />
         </div>
         <div className={styles.row}>
            <h4 className={styles.small_title}>Тип:</h4>

            <BrandTypeDropDown
               placeholder="Поиск по типу..."
               list={types}
               searchValue={typeSearchValue}
               setSearchValue={setTypeSearchValue}
               callback={(id: number) => setTypeId(id)}
            />
         </div>
         <div className={styles.row}>
            <h4 className={styles.small_title}>Цена:</h4>

            <PriceInputEditor value={price} setValue={setPrice} />
         </div>
         <div className={styles.row}>
            <h4 className={styles.small_title}>Количество товара:</h4>

            <QuantityInputEditor value={quantity} setValue={setQuantity} />
         </div>
         <DescriptionEditor description={description} setDescription={setDescription} />
         <ImgEditor image={image} setImage={setImage} />
         <DeviceInfoEditor info={info} setInfo={setInfo} />
         <div className={styles.row}>
            <input type="checkbox" checked={onSale} onChange={() => setOnSale((prev) => !prev)} />
            Продовать?
         </div>
         {error && <h2 className={`${styles.title} ${styles.title_red}`}>{error}</h2>}
         <div className={styles.row}>
            <SimpleButton onClick={sendData}>{buttonName}</SimpleButton>
         </div>
      </div>
   );
};

export default DeviceEditor;
