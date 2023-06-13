import DeviceCard from 'entities/DeviceCard';
import { IOneDevice } from 'shared/model/DeviceModel';
import { SimpleButton } from 'shared/ui/SimpleButton';

interface DeviceCardForVendorProps {
   device: IOneDevice;
   refElement?: (node: HTMLDivElement) => void;
}

const DeviceCardForVendor: React.FC<DeviceCardForVendorProps> = ({ device, refElement }) => {
   return (
      <DeviceCard refElement={refElement} device={device}>
         <SimpleButton>Изменить</SimpleButton>
      </DeviceCard>
   );
};

export default DeviceCardForVendor;
