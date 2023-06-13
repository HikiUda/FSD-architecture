import { InfoDescription } from '../InfoDescription';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { SVGButton } from 'shared/ui/SVGButton';
import { LikedSVG } from '../SVGcomp';
import DeviceMainInfo from '../DeviceMainInfo/DeviceMainInfo';
import DeviceDescription from '../DeviceDescription';
import commonStyles from './../../styles/common.module.scss';
import { useAppSelector } from 'shared/lib/hooks';
import { CheckMarkSVG } from 'features/DeviceCardForUser/ui/SVGcomp';
import { ClipLoader } from 'react-spinners';
import useGetDeviceInfo from 'widgets/DeviceInfo/lib/hooks/useGetDeviceInfo';
import { fetchCreateChat } from 'shared/api/fetchCreateChat';
import { useNavigate } from 'react-router-dom';
import { P_USER_CHAT } from 'shared/lib/pathes';

interface DeviceInfoProps {
   id: number;
}

const DeviceInfo: React.FC<DeviceInfoProps> = ({ id }) => {
   const { device, loading, error, isLiked, isAdded, addInCart, changeIsLiked } =
      useGetDeviceInfo(id);
   const { auth } = useAppSelector((state) => state.user);
   const navigate = useNavigate();

   function openChatWithVendor() {
      if (device) {
         fetchCreateChat(device.userId)
            .then((data) => {
               navigate(`${P_USER_CHAT}/${data.id}`);
            })
            .catch((e) => {
               console.log(e);
            });
      }
   }

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
            <DeviceMainInfo device={device}>
               {auth ? (
                  <>
                     {isLiked ? (
                        <SVGButton onClick={() => changeIsLiked()}>
                           <LikedSVG />
                        </SVGButton>
                     ) : (
                        <SimpleButton onClick={() => changeIsLiked()}>В избранные</SimpleButton>
                     )}

                     {isAdded ? (
                        <CheckMarkSVG />
                     ) : (
                        <SimpleButton onClick={() => addInCart()}>В корзину</SimpleButton>
                     )}
                     <SimpleButton onClick={openChatWithVendor}>
                        Задать вопрос продовцу
                     </SimpleButton>
                  </>
               ) : null}
            </DeviceMainInfo>
            <DeviceDescription text={device.description} />
            {device.info ? <InfoDescription info={device.info} /> : null}
         </div>
      </div>
   );
};

export default DeviceInfo;
