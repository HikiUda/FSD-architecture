import { Modal } from 'shared/ui/Modal';
import styles from './style.module.scss';
import { SimpleButton } from 'shared/ui/SimpleButton';
import { SVGButton } from 'shared/ui/SVGButton';
import CrossSVG from 'shared/ui/SVGcomp';
import { useState } from 'react';
import { MainInput } from 'shared/ui/MainInput';
import { useNavigate } from 'react-router-dom';
import { fetchBuyDevcies } from 'widgets/UserCart/api/fetchBuyDevices';
import { P_USER_PURCHES } from 'shared/lib/pathes';

interface BuyModalProps {
   show: boolean;
   onHide: () => void;
}

const BuyModal: React.FC<BuyModalProps> = ({ show, onHide }) => {
   const [value, setValue] = useState<string>('');
   const navigate = useNavigate();

   function changeValue(e: React.FormEvent<HTMLInputElement>) {
      let tarVal = e.currentTarget.value;
      if (!tarVal || (!!Number(tarVal) && tarVal.length <= 16)) {
         setValue(tarVal);
      }
   }

   function buy() {
      if (value) {
         fetchBuyDevcies();

         onHide();
         navigate(P_USER_PURCHES);
      }
   }

   return (
      <Modal show={show} onHide={onHide}>
         <div className={styles.buymodal__row}>
            <h3 className={styles.buymodal__title}>Введите номер карты и подтвердите покупку</h3>
            <SVGButton onClick={onHide}>
               <CrossSVG />
            </SVGButton>
         </div>
         <form className={styles.buymodal__column}>
            <MainInput
               value={value}
               setValue={changeValue}
               type="text"
               placeholder="Введите номер карты"
            />
         </form>
         <div className={styles.buymodal__row}>
            <SimpleButton onClick={() => buy()}>Подтвердить</SimpleButton>
         </div>
      </Modal>
   );
};

export default BuyModal;
