import { IOneDevice } from 'shared/model/DeviceModel';
import styles from './style.module.scss';
import React from 'react';
import { BASE_URL } from 'shared/api';

interface DeviceCardProps {
   device: IOneDevice;
   moreClasses?: string;
   children?: React.ReactNode;
   refElement?: (node: HTMLDivElement) => void;
}

//'shop-tape'

const DeviceCard: React.FC<DeviceCardProps> = ({
   device,
   moreClasses = '',
   children,
   refElement,
}) => {
   const { img, price, name, brandName, typeName } = device;
   return (
      <div ref={refElement} className={`${styles.device_card} ${moreClasses}`}>
         <div className={styles.device_card__img}>
            <img src={`${BASE_URL}/${img}`} alt="img" />
         </div>
         <h3 className={styles.device_card__title}>{name}</h3>
         <h3 className={styles.device_card__price}>{price} руб.</h3>
         <h3 className={styles.device_card__price}>
            {' '}
            {typeName}: {brandName}
         </h3>
         <div className={styles.device_card__buttons}>{children}</div>
      </div>
   );
};

export default DeviceCard;
