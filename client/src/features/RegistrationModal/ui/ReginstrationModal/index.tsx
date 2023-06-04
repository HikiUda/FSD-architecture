import { AuthModal } from 'entities/AuthModal';
import React from 'react';
import styles from './style.module.scss';
import { authRegistration } from 'features/RegistrationModal/api';
import { useAppDispatch } from 'shared/lib/hooks';
import { updateAuthState } from 'shared/store';

interface ReginstrationModalProps {
   show: boolean;
   onHide: () => void;
   children?: React.ReactNode;
}

export const RegistrationModal: React.FC<ReginstrationModalProps> = ({
   show,
   onHide,
   children,
}) => {
   const dispatch = useAppDispatch();
   async function sendForm(email: string, password: string) {
      const data = await authRegistration(email, password);
      if (data) {
         dispatch(updateAuthState({ ...data, auth: true }));
      }
   }
   return (
      <AuthModal
         onClick={(email, password) => sendForm(email, password)}
         show={show}
         onHide={onHide}
         title="Регестрация"
         buttonName="Зарегестрироваться">
         <div className={styles.pirple_span}>{children}</div>
      </AuthModal>
   );
};
