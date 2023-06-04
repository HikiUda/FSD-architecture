import DeviceCard from 'entities/DeviceCard';

import { Link } from 'react-router-dom';
import { P_USER_CART } from 'shared/lib/pathes';
import { ICartDevice } from 'shared/model/DeviceModel';

interface DeviceCardForCartProps {
   device: ICartDevice;
   moreClasses?: string;
}

const DeviceCardForCart: React.FC<DeviceCardForCartProps> = ({ device, moreClasses = '' }) => {
   return (
      <DeviceCard device={device.deviceInfo} moreClasses={moreClasses}>
         <div>Кол. {device.deviceInfo.forPurches}</div>
         <Link to={`${P_USER_CART}/${device.basketDeviceId}`} className="blue__button">
            Подробнее
         </Link>
      </DeviceCard>
   );
};

export default DeviceCardForCart;
