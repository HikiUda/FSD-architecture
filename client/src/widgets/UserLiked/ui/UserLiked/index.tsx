import styles from './style.module.scss';
import DeviceCardForUser from 'features/DeviceCardForUser/ui/DeviceCardForUser';
import { ClipLoader } from 'react-spinners';
import useLiked from 'widgets/UserLiked/lib/hooks/useLiked';

const UserLiked: React.FC = () => {
   const { loading, error, liked } = useLiked();

   return (
      <div className={styles.user__tape}>
         {liked.map((device) => (
            <DeviceCardForUser moreClasses={styles.user__card} key={device.id} device={device} />
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

export default UserLiked;
