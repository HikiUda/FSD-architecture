import styles from './styles.module.scss';
import { useState } from 'react';
import DeviceCardForCart from 'features/DeviceCardForCart/ui/DeviceCardForCart';
import BuyModal from '../BuyModal';
import { ClipLoader } from 'react-spinners';
import useCartDevices from '../../lib/hooks/useCartDevices';
import CartTotalBar from '../CartTotalBar';

const UserCart = () => {
   const { devices, loading, error } = useCartDevices();
   const [show, setShow] = useState<boolean>(false);

   return (
      <>
         <div className={styles.cart}>
            <div className={styles.cart__tape}>
               {devices.map((device) => (
                  <DeviceCardForCart key={device.basketDeviceId} device={device} />
               ))}
            </div>

            <CartTotalBar
               devices={devices}
               moreClasses={styles.cart__totalbar}
               buyFunc={() => setShow(true)}
            />
         </div>
         <BuyModal show={show} onHide={() => setShow(false)} />
         {loading && (
            <ClipLoader
               color={'#54fa34'}
               loading={true}
               size={150}
               aria-label="Loading Spinner"
               data-testid="loader"
            />
         )}
         {error ? error : null}
      </>
   );
};

export default UserCart;
