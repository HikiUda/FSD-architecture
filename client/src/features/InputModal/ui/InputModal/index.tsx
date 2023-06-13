import { MainInput } from 'shared/ui/MainInput';
import { Modal } from 'shared/ui/Modal';
import { SimpleButton } from 'shared/ui/SimpleButton';
import styles from './styles.module.scss';

interface InputModalProps {
   show: boolean;
   onHide: () => void;
   value: string;
   setValue: (e: React.FormEvent<HTMLInputElement> | string) => void;
   toDecide: (decide: boolean) => void;
}

const InputModal: React.FC<InputModalProps> = ({ show, onHide, value, setValue, toDecide }) => {
   function handleDecide(decide: boolean) {
      toDecide(decide);
      onHide();
   }

   return (
      <Modal show={show} onHide={onHide}>
         <div className={styles.upd_modal}>
            <h3 className={styles.upd_modal__title}>Редоктирование</h3>
            <MainInput value={value} setValue={setValue} moreClass={styles.upd_modal__input} />
            <div className={styles.upd_modal__row}>
               <SimpleButton onClick={() => handleDecide(true)}>Изменить</SimpleButton>
               <SimpleButton onClick={() => handleDecide(false)}>Отмена</SimpleButton>
            </div>
         </div>
      </Modal>
   );
};

export default InputModal;
