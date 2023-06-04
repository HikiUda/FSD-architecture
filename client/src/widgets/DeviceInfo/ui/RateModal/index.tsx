import { Modal } from 'shared/ui/Modal';
import styles from './style.module.scss';
import { SVGButton } from 'shared/ui/SVGButton';
import CrossSVG from 'shared/ui/SVGcomp';
import { useState } from 'react';
import { EmptyStarSVG, StarSVG } from '../SVGcomp';
import { fetcthToRate } from 'widgets/DeviceInfo/api/fetchToRate';

interface RateModalProps {
   show: boolean;
   onHide: () => void;
   deviceId: number;
}

const RateModal: React.FC<RateModalProps> = ({ deviceId, show, onHide }) => {
   const [currentRate, setCurrentRate] = useState<number>(0);

   function sendRate(rate: number) {
      fetcthToRate(deviceId, rate);
      onHide();
   }

   return (
      <Modal show={show} onHide={onHide}>
         <div className={styles.rateModal__row}>
            <h3 className={styles.rateModal__title}>Благодарим за отзыв</h3>
            <SVGButton onClick={onHide}>
               <CrossSVG />
            </SVGButton>
         </div>
         <div className={styles.rateModal__row} onMouseLeave={() => setCurrentRate(0)}>
            {[1, 2, 3, 4, 5].map((rate) => {
               return (
                  <span
                     onClick={() => sendRate(rate)}
                     key={rate}
                     onMouseEnter={() => setCurrentRate(rate)}>
                     {rate <= currentRate ? <StarSVG /> : <EmptyStarSVG />}
                  </span>
               );
            })}
         </div>
      </Modal>
   );
};

export default RateModal;
