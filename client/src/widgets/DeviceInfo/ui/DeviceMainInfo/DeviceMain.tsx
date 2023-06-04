import styles from './style.module.scss';
import { BASE_URL } from 'shared/api';

interface DeviceMainProps {
   img: string;
   children?: React.ReactNode;
}

const DeviceMain: React.FC<DeviceMainProps> = ({ img, children }) => {
   return (
      <div className={styles.main}>
         <div className={styles.img}>
            <img src={`${BASE_URL}/${img}`} alt="img" />
         </div>
         <div className={styles.base_info}>{children}</div>
      </div>
   );
};

export default DeviceMain;
