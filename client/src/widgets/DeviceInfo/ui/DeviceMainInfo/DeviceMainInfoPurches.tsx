import { IOneDevice } from 'shared/model/DeviceModel';
import styles from './style.module.scss';
import commonStyles from './../../styles/common.module.scss';

import DeviceMain from './DeviceMain';

interface DeviceMainInfoPurchesProps {
   device: IOneDevice;
   children?: React.ReactNode;
}

const DeviceMainInfoPurches: React.FC<DeviceMainInfoPurchesProps> = ({ device, children }) => {
   return (
      <DeviceMain img={device.img}>
         <h2 className={`${commonStyles.big_title} perple-underline`}>Название: {device.name}</h2>
         <h2 className={`${commonStyles.big_title} perple-underline`}>Цена: {device.price} руб.</h2>

         <div className={styles.subblock}>
            <h2 className={`${commonStyles.small_title} perple-underline`}>
               Бренд: {device.brandName}
            </h2>
            <h2 className={`${commonStyles.small_title} perple-underline`}>
               Тип: {device.typeName}
            </h2>
         </div>

         <div className={styles.subblock}>{children}</div>
      </DeviceMain>
   );
};

export default DeviceMainInfoPurches;
