import { useParams } from 'react-router-dom';
import { DeviceComment } from 'widgets/DeviceComment';
import { DeviceInfo } from 'widgets/DeviceInfo';

const DevicePage = () => {
   const { id } = useParams();

   return (
      <main className="main">
         <DeviceInfo id={Number(id)} />
         <DeviceComment deviceId={Number(id)} />
      </main>
   );
};

export default DevicePage;
