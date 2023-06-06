import styles from './styles.module.scss';

import { DeviceCardForPurches } from 'features/DeviceCardForPurches';
import { ClipLoader } from 'react-spinners';
import usePurches from 'widgets/UserPurches/lib/hooks/usePurches';

const UserPurches = () => {
   const { purches, loading, error } = usePurches();

   return (
      <div className={styles.user__tape}>
         {purches.map((device) => (
            <DeviceCardForPurches
               moreClasses={styles.user__card}
               key={device.purchesId}
               device={device}
            />
         ))}
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
      </div>
   );
};

export default UserPurches;
