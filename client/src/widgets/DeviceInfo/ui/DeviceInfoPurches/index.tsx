import { useNavigate, useParams } from 'react-router-dom';
import commonStyles from './../../styles/common.module.scss';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { P_USER_PURCHES } from 'shared/lib/pathes';
import DeviceDescription from '../DeviceDescription';
import { InfoDescriptionPurches } from '../InfoDescription';
import DeviceMainInfoPurches from '../DeviceMainInfo/DeviceMainInfoPurches';
import { ClipLoader } from 'react-spinners';
import usePurchesDevice from 'widgets/DeviceInfo/lib/hooks/usePurchesDevice';

const DeviceInfoPurches = () => {
   const { purchesId } = useParams();
   const navigate = useNavigate();

   const { device, loading, error } = usePurchesDevice(Number(purchesId));

   if (!device) {
      return (
         <div className={commonStyles.device_page}>
            <div className={`${commonStyles.device_page__container} __container`}>
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
         </div>
      );
   }
   return (
      <div className={commonStyles.device_page}>
         <div className={`${commonStyles.device_page__container} __container`}>
            <SimpleButton onClick={() => navigate(P_USER_PURCHES)}>Назад</SimpleButton>
            <DeviceMainInfoPurches device={device.deviceInfo}>
               <h3 className={`${commonStyles.small_title} perple-underline`}>
                  Количество: {device.deviceInfo.forPurches}шт.
               </h3>
            </DeviceMainInfoPurches>
            <DeviceDescription text={device.deviceInfo.description} />
            {device.deviceInfo.info ? (
               <InfoDescriptionPurches info={device.deviceInfo.info} />
            ) : null}
         </div>
      </div>
   );
};

export default DeviceInfoPurches;
