import React from 'react';
import styles from './style.module.scss';

interface ModalProps {
   children?: React.ReactNode | string | null;
   moreClass?: string;
   show: boolean;
   onHide: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, moreClass = '', show, onHide }) => {
   return (
      <div className={`${styles.modal} ${show ? styles.modal_active : ''}`} onClick={onHide}>
         <div onClick={(e) => e.stopPropagation()} className={`${styles.modal__body} ${moreClass}`}>
            {children}
         </div>
      </div>
   );
};
