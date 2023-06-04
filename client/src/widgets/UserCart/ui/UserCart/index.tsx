import { SimpleButton } from 'shared/ui/SimpleButton';
import styles from './styles.module.scss';
import { ICartDevice } from 'shared/model/DeviceModel';
import { useEffect, useState } from 'react';
import { fetchCartDevices } from 'widgets/UserCart/api/fetchCartDevices';
import DeviceCardForCart from 'features/DeviceCardForCart/ui/DeviceCardForCart';
import BuyModal from '../BuyModal';
import { ClipLoader } from 'react-spinners';

const UserCart = () => {
   const [devices, setDevices] = useState<ICartDevice[] | null>(null);
   const [show, setShow] = useState<boolean>(false);

   useEffect(() => {
      fetchCartDevices().then((data) => (data ? setDevices(data) : null));
   }, []);

   if (!devices) {
      return (
         <div className={styles.cart}>
            <ClipLoader
               color={'#54fa34'}
               loading={true}
               size={150}
               aria-label="Loading Spinner"
               data-testid="loader"
            />
         </div>
      );
   }
   return (
      <>
         <div className={styles.cart}>
            <div className={styles.cart__tape}>
               {devices.map((device) => (
                  <DeviceCardForCart key={device.basketDeviceId} device={device} />
               ))}
            </div>

            <div className={styles.cart__totalbar}>
               <div className={styles.cart__totalbar_block}>
                  <h3 className={`${styles.cart__totalbar_title} perple-underline`}>
                     Общая стоимость:{' '}
                     {devices.reduce(
                        (acc, device) =>
                           (acc += device.deviceInfo.price * device.deviceInfo.forPurches),
                        0,
                     )}
                     руб.
                  </h3>
                  <h3 className={`${styles.cart__totalbar_title} perple-underline`}>
                     Общее количество:{' '}
                     {devices.reduce((acc, device) => (acc += device.deviceInfo.forPurches), 0)}
                     шт.
                  </h3>
                  <SimpleButton onClick={() => setShow(true)}>Купить</SimpleButton>
               </div>
            </div>
         </div>
         <BuyModal show={show} onHide={() => setShow(false)} />
      </>
   );
};

export default UserCart;
