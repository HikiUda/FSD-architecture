import { IPurchesDevice } from 'shared/model/DeviceModel';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { fetchPurchesDevcies } from 'widgets/UserPurches/api/purches';
import DeviceCardForUser from 'features/DeviceCardForUser';
import { DeviceCardForPurches } from 'features/DeviceCardForPurches';
import { ClipLoader } from 'react-spinners';

const UserPurches = () => {
   const [devices, setDevices] = useState<IPurchesDevice[] | null>(null);

   useEffect(() => {
      fetchPurchesDevcies().then((data) => (data ? setDevices(data) : null));
   }, []);

   if (!devices) {
      return (
         <div className={styles.user__tape}>
            <ClipLoader
               color={'#54fa34'}
               loading={true}
               size={150}
               aria-label="Loading Spinner"
               data-testid="loader"
            />
            ;
         </div>
      );
   }

   return (
      <div className={styles.user__tape}>
         {devices.map((device) => (
            <DeviceCardForPurches
               moreClasses={styles.user__card}
               key={device.purchesId}
               device={device}
            />
         ))}
      </div>
   );
};

export default UserPurches;
