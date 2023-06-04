import { fetchDevice } from 'shared/api/fetchDevice';

import { IOneDevice } from 'shared/model/DeviceModel';
import { useEffect, useState } from 'react';
import { InfoDescription } from '../InfoDescription';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { fetchAddInCart, fetchChangeLiked, fetchIsLiked } from 'shared/api';
import { SVGButton } from 'shared/ui/SVGButton';
import { LikedSVG } from '../SVGcomp';
import DeviceMainInfo from '../DeviceMainInfo/DeviceMainInfo';
import DeviceDescription from '../DeviceDescription';
import commonStyles from './../../styles/common.module.scss';
import { useAppSelector } from 'shared/lib/hooks';
import { CheckMarkSVG } from 'features/DeviceCardForUser/ui/SVGcomp';
import { ClipLoader } from 'react-spinners';

interface DeviceInfoProps {
   id: number;
}

const DeviceInfo: React.FC<DeviceInfoProps> = ({ id }) => {
   const [device, setDevice] = useState<IOneDevice | null>(null);
   const [isLiked, setIsLiked] = useState<boolean>(false);
   const [isAdded, setIsAdded] = useState<boolean>(false);
   const { auth } = useAppSelector((state) => state.user);

   useEffect(() => {
      fetchDevice(id).then((data) => (data ? setDevice(data) : null));
      if (auth) {
         fetchIsLiked(id).then((data) => (data ? setIsLiked(data.isLiked) : null));
      }
   }, [id]);

   function changeIsLiked() {
      console.log(device);
      fetchChangeLiked(id);
      setIsLiked((prev) => !prev);
   }
   function addInCart() {
      if (device) {
         fetchAddInCart(id, { ...device, forPurches: 1 });
         setIsAdded(true);
         setTimeout(() => {
            setIsAdded(false);
         }, 3000);
      }
   }

   if (!device) {
      return (
         <div className={commonStyles.device_page}>
            <div className={`${commonStyles.device_page__container} __container`}>
               <ClipLoader
                  color={'#54fa34'}
                  loading={true}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
               />
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
