import { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { IOneDevice } from 'shared/model/DeviceModel';
import { fetchUserLiked } from 'widgets/UserLiked/api/fetchUserLiked';
import DeviceCardForUser from 'features/DeviceCardForUser/ui/DeviceCardForUser';
import { ClipLoader } from 'react-spinners';

const UserLiked: React.FC = () => {
   const [devices, setDevices] = useState<IOneDevice[] | null>(null);
   useEffect(() => {
      fetchUserLiked().then((data) => (data ? setDevices(data) : []));
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
            <DeviceCardForUser moreClasses={styles.user__card} key={device.id} device={device} />
         ))}
      </div>
   );
};

export default UserLiked;
