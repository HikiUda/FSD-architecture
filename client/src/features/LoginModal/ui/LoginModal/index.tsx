import { AuthModal } from 'entities/AuthModal';
import React from 'react';
import styles from './style.module.scss';
import { authLogin } from 'features/LoginModal/api';
import { useAppDispatch } from 'shared/lib/hooks';
import { updateAuthState } from 'shared/store';

interface LoginModalProps {
   show: boolean;
   onHide: () => void;
   children?: React.ReactNode;
}

export const LoginModal: React.FC<LoginModalProps> = ({ show, onHide, children }) => {
   const dispatch = useAppDispatch();
   async function sendForm(email: string, password: string) {
      const data = await authLogin(email, password);
      if (data) {
         dispatch(updateAuthState({ ...data, auth: true }));
      }
   }
   return (
      <AuthModal
         onClick={(email, password) => sendForm(email, password)}
         show={show}
         onHide={onHide}
         title="Вход"
         buttonName="Войти">
         <div className={styles.pirple_span}>{children}</div>
      </AuthModal>
   );
};
