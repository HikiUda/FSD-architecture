import DeviceCard from 'entities/DeviceCard';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchAddInCart, fetchChangeLiked, fetchInCart, fetchIsLiked } from 'shared/api';
import { useAppSelector } from 'shared/lib/hooks';
import { P_DEVICE } from 'shared/lib/pathes';
import { IOneDevice } from 'shared/model/DeviceModel';
import { SVGButton } from 'shared/ui/SVGButton';
import { AddSVG, CheckMarkSVG, LikedSVG } from '../SVGcomp';

interface DeviceCardForUserProps {
   moreClasses?: string;
   device: IOneDevice;
}

const DeviceCardForUser: React.FC<DeviceCardForUserProps> = ({ device, moreClasses }) => {
   const { id } = device;
   const { auth } = useAppSelector((state) => state.user);
   const [isLiked, setIsLiked] = useState<boolean>(false);
   const [inCart, setInCart] = useState<boolean>(false);

   useEffect(() => {
      if (auth) {
         fetchIsLiked(id).then((data) => (data ? setIsLiked(data.isLiked) : null));
         fetchInCart(id).then((data) => (data ? setInCart(data.inCart) : null));
      }
   }, [id]);

   function changeIsLiked() {
      setIsLiked((prev) => !prev);
      fetchChangeLiked(id);
   }
   function addInCart() {
      fetchAddInCart(id, null);
      setInCart(true);
   }

   return (
      <DeviceCard device={device} moreClasses={moreClasses}>
         <Link to={`${P_DEVICE}/${id}`} className="blue__button">
            Подробнее
         </Link>
         {auth ? (
            <>
               <SVGButton onClick={() => changeIsLiked()}>
                  <LikedSVG isLiked={isLiked} />
               </SVGButton>
               {inCart ? (
                  <CheckMarkSVG />
               ) : (
                  <SVGButton onClick={() => addInCart()}>
                     <AddSVG />
                  </SVGButton>
               )}
            </>
         ) : null}
      </DeviceCard>
   );
};

export default DeviceCardForUser;
