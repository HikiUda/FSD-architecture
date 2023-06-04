import React from 'react';
import { authLogout } from 'features/LoguotButton/api/logout';
import { useAppDispatch } from 'shared/lib/hooks';
import { IToken, IUser } from 'shared/model/AuthModel';
import { updateAuthState } from 'shared/store';
import { SimpleButton } from 'shared/ui/SimpleButton';

interface LogoutButtonProps {
   someFunc?: () => any;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({ someFunc }) => {
   const dispatch = useAppDispatch();
   function logout() {
      authLogout();
      const data = { auth: false, user: {} as IUser, tokens: {} as IToken };
      dispatch(updateAuthState(data));
      if (someFunc) {
         someFunc();
      }
   }
   return (
      <SimpleButton onClick={() => logout()} moreClass="header__button">
         Выйти
      </SimpleButton>
   );
};
