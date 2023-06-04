import { IDeviceInfo, IDeviceInfoDescription } from 'shared/model/DeviceModel';
import commonStyles from './../../styles/common.module.scss';
import styles from './styles.module.scss';
import { useState } from 'react';

interface InfoDescriptionProps {
   info: IDeviceInfo[];
}
interface ICharacteristicProps {
   characteristics: IDeviceInfo;
}

const Characteristic: React.FC<ICharacteristicProps> = ({ characteristics }) => {
   const [description, setDescription] = useState<IDeviceInfoDescription[]>(
      characteristics.description,
   );
   //ОПАСНО! НУЖНО ЕЩЕ ПОДУМАТЬ!
   function changeActive(id: number) {
      setDescription((prev) => {
         return prev.map((ch) =>
            ch.id === id ? { ...ch, selected: true } : { ...ch, selected: false },
         );
      });
      characteristics.description = characteristics.description.map((ch) =>
         ch.id === id ? { ...ch, selected: true } : { ...ch, selected: false },
      );
   }

   return (
      <div key={characteristics.id} className={styles.characteristic}>
         <h4 className={styles.characteristic_title}>{characteristics.title}:</h4>

         <div className={styles.characteristic_info}>
            {description.map((descItem) => {
               return (
                  <span
                     onClick={() => changeActive(descItem.id)}
                     key={descItem.id}
                     className={descItem.selected ? styles._active : ''}>
                     {descItem.description}
                  </span>
               );
            })}
         </div>
      </div>
   );
};

const InfoDescription: React.FC<InfoDescriptionProps> = ({ info }) => {
   return (
      <div className={styles.info_block}>
         <h2 className={`${commonStyles.big_title} perple-underline`}>Характеристики</h2>
         {info.map((item) => (
            <Characteristic key={item.id} characteristics={item} />
         ))}
      </div>
   );
};

export default InfoDescription;
