import { useNavigate, useParams } from 'react-router-dom';
import DeviceDescription from '../DeviceDescription';
import DeviceMainInfo from '../DeviceMainInfo/DeviceMainInfo';
import { InfoDescription } from '../InfoDescription';
import commonStyles from './../../styles/common.module.scss';
import { SimpleButton } from 'shared/ui/SimpleButton';
import CartCouter from '../CartCouter';
import { P_DEVICE, P_USER_CART } from 'shared/lib/pathes';
import { CheckMarkSVG } from 'features/DeviceCardForUser/ui/SVGcomp';
import { ClipLoader } from 'react-spinners';
import useCartDevice from 'widgets/DeviceInfo/lib/hooks/useCartDevice';

interface DeviceInfoCartProps {}

const DeviceInfoCart: React.FC<DeviceInfoCartProps> = () => {
   const { basketDeviceId } = useParams();
   const navigate = useNavigate();
   const { device, loading, error, deleteFromCart, saveChanges, isSave } = useCartDevice(
      Number(basketDeviceId),
   );

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
            <SimpleButton onClick={() => navigate(P_USER_CART)}>Назад</SimpleButton>
            <DeviceMainInfo device={device.deviceInfo}>
               <CartCouter deleteFromCart={deleteFromCart} device={device.deviceInfo} />
               {isSave ? (
                  <CheckMarkSVG />
               ) : (
                  <SimpleButton onClick={saveChanges}>Сохранить изменения</SimpleButton>
               )}
               <SimpleButton onClick={() => navigate(`${P_DEVICE}/${device.deviceInfo.id}`)}>
                  Перейти на страницу тавара
               </SimpleButton>
            </DeviceMainInfo>
            <DeviceDescription text={device.deviceInfo.description} />
            {device.deviceInfo.info ? <InfoDescription info={device.deviceInfo.info} /> : null}
         </div>
      </div>
   );
};

export default DeviceInfoCart;
