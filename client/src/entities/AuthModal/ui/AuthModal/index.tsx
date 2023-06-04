import React from 'react';
import { MainInput } from 'shared/ui/MainInput';
import { Modal } from 'shared/ui/Modal';
import { SVGButton } from 'shared/ui/SVGButton';
import { SimpleButton } from 'shared/ui/SimpleButton';
import styles from './style.module.scss';
import { useInput } from 'shared/lib/hooks';
import CrossSVG from 'shared/ui/SVGcomp';

interface AuthModalProps {
   show: boolean;
   onHide: () => void;
   title: string;
   buttonName: string;
   children?: React.ReactNode | null;
   onClick: (email: string, password: string) => void;
}
export const AuthModal: React.FC<AuthModalProps> = ({
   show,
   onHide,
   children,
   title,
   buttonName,
   onClick,
}) => {
   const { value: email, changeValue: setEmail } = useInput();
   const { value: password, changeValue: setPassword } = useInput();

   return (
      <Modal show={show} onHide={onHide} moreClass={styles.authmodal}>
         <div className={styles.authmodal__row}>
            <h3 className={styles.authmodal__title}>{title}</h3>
            <SVGButton onClick={onHide}>
               <CrossSVG />
            </SVGButton>
         </div>
         <form className={styles.authmodal__column}>
            <MainInput value={email} setValue={setEmail} type="email" placeholder="email" />
            <MainInput
               value={password}
               setValue={setPassword}
               type="password"
               placeholder="пароль"
            />
         </form>
         <div className={styles.authmodal__row}>
            <SimpleButton onClick={() => onClick(email, password)}>{buttonName}</SimpleButton>
            {children}
         </div>
      </Modal>
   );
};
