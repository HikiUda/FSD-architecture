import { IOneDevice } from 'shared/model/DeviceModel';
import styles from './style.module.scss';
import commonStyles from './../../styles/common.module.scss';

import DeviceMain from './DeviceMain';
import { useState } from 'react';
import RateModal from '../RateModal';
import { StarSVG } from '../SVGcomp';
import { SimpleButton } from 'shared/ui/SimpleButton';

interface DeviceMainInfoProps {
   device: IOneDevice;
   children?: React.ReactNode;
}

const DeviceMainInfo: React.FC<DeviceMainInfoProps> = ({ device, children }) => {
   const [showRate, setShowRate] = useState<boolean>(false);

   return (
      <>
         <DeviceMain img={device.img}>
            <h2 className={`${commonStyles.big_title} perple-underline`}>
               Название: {device.name}
            </h2>
            <h2 className={`${commonStyles.big_title} perple-underline`}>
               Цена: {device.price} руб.
            </h2>
            <h2
               onClick={() => setShowRate(true)}
               className={`${commonStyles.big_title} perple-underline`}>
               Рейтинг: {device.rating}
               <StarSVG /> из 5<StarSVG />
            </h2>
            <div className={styles.subblock}>
               <h2 className={`${commonStyles.small_title} perple-underline`}>
                  Бренд: {device.brandName}
               </h2>
               <h2 className={`${commonStyles.small_title} perple-underline`}>
                  Тип: {device.typeName}
               </h2>
            </div>
            <div className={styles.subblock}>
               <h2 className={`${commonStyles.small_title} perple-underline`}>
                  Всего в продаже: {device?.quantity} шт.
               </h2>
               <h2 className={`${commonStyles.small_title} perple-underline`}>
                  Продано: {device.countOfPurches} шт.
               </h2>
            </div>
            <div className={styles.subblock}>
               {children}
               <SimpleButton onClick={() => setShowRate(true)}>Поставить оценку</SimpleButton>
            </div>
         </DeviceMain>
         <RateModal deviceId={device.id} show={showRate} onHide={() => setShowRate(false)} />
      </>
   );
};

export default DeviceMainInfo;
