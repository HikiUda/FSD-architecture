import DeviceCard from 'entities/DeviceCard';

import { Link } from 'react-router-dom';
import { P_USER_PURCHES } from 'shared/lib/pathes';
import { IPurchesDevice } from 'shared/model/DeviceModel';

interface DeviceCardForPurchesProps {
   device: IPurchesDevice;
   moreClasses?: string;
}

const DeviceCardForPurches: React.FC<DeviceCardForPurchesProps> = ({
   device,
   moreClasses = '',
}) => {
   return (
      <DeviceCard device={device.deviceInfo} moreClasses={moreClasses}>
         <div>Кол. {device.deviceInfo.forPurches}</div>
         <Link to={`${P_USER_PURCHES}/${device.purchesId}`} className="blue__button">
            Подробнее
         </Link>
      </DeviceCard>
   );
};

export default DeviceCardForPurches;
