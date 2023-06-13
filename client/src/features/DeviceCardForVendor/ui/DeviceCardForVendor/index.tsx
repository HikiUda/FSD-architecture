import DeviceCard from 'entities/DeviceCard';
import { useNavigate } from 'react-router-dom';
import { P_USER_MYPRODUCT_EDITDEVICE } from 'shared/lib/pathes';
import { IOneDevice } from 'shared/model/DeviceModel';
import { SimpleButton } from 'shared/ui/SimpleButton';

interface DeviceCardForVendorProps {
   device: IOneDevice;
   refElement?: (node: HTMLDivElement) => void;
}

const DeviceCardForVendor: React.FC<DeviceCardForVendorProps> = ({ device, refElement }) => {
   const navigate = useNavigate();

   return (
      <DeviceCard refElement={refElement} device={device}>
         <SimpleButton onClick={() => navigate(`${P_USER_MYPRODUCT_EDITDEVICE}/${device.id}`)}>
            Изменить
         </SimpleButton>
      </DeviceCard>
   );
};

export default DeviceCardForVendor;
