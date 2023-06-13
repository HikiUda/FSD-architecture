import { Modal } from 'shared/ui/Modal';
import { SimpleButton } from 'shared/ui/SimpleButton';
import styles from './styles.module.scss';

interface ConfirmModalProps {
   show: boolean;
   onHide: () => void;
   toDecide: (choose: boolean) => void;
   title?: string;
   children?: React.ReactNode;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
   show,
   onHide,
   toDecide,
   title = '',
   children,
}) => {
   function handleDecide(choose: boolean) {
      toDecide(choose);
      onHide();
   }
   return (
      <Modal show={show} onHide={onHide}>
         {title ? <h3 className={styles.confirm_modal_title}>{title}</h3> : null}
         <div className={styles.confirm_modal__column}>{children}</div>
         <div className={styles.confirm_modal__row}>
            <SimpleButton onClick={() => handleDecide(true)}>Ок</SimpleButton>
            <SimpleButton onClick={() => handleDecide(false)}>Отменить</SimpleButton>
         </div>
      </Modal>
   );
};

export default ConfirmModal;
