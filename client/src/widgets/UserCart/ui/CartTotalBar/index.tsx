import { ICartDevice } from 'shared/model/DeviceModel';
import styles from './styles.module.scss';
import { SimpleButton } from 'shared/ui/SimpleButton';

interface CartTotalBarProps {
   devices: ICartDevice[];
   moreClasses?: string;
   buyFunc: () => void;
}

const CartTotalBar: React.FC<CartTotalBarProps> = ({ devices, moreClasses = '', buyFunc }) => {
   return (
      <div className={`${styles.totalbar} ${moreClasses}`}>
         <div className={styles.totalbar_block}>
            <h3 className={`${styles.totalbar_title} perple-underline`}>
               Общая стоимость:{' '}
               {devices.reduce(
                  (acc, device) => (acc += device.deviceInfo.price * device.deviceInfo.forPurches),
                  0,
               )}
               руб.
            </h3>
            <h3 className={`${styles.totalbar_title} perple-underline`}>
               Общее количество:{' '}
               {devices.reduce((acc, device) => (acc += device.deviceInfo.forPurches), 0)}
               шт.
            </h3>
            <SimpleButton onClick={buyFunc}>Купить</SimpleButton>
         </div>
      </div>
   );
};

export default CartTotalBar;
