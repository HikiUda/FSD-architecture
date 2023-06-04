import { SimpleButton } from 'shared/ui/SimpleButton';
import './style.scss';
import { SVGButton } from 'shared/ui/SVGButton';
import { Logo } from 'shared/ui/Logo';
import { useState } from 'react';
import { LoginModal } from 'features/LoginModal';
import { RegistrationModal } from 'features/RegistrationModal';
import { useAppSelector } from 'shared/lib/hooks';
import { checkRoles } from 'shared/lib/functions/checkRoles';
import { LogoutButton } from 'features/LoguotButton';
import { useNavigate } from 'react-router-dom';
import { P_SHOP, P_USER_LIKED } from 'shared/lib/pathes';

export const Header = () => {
   const [isBurgerActive, setIsBurgerActive] = useState<boolean>(false);
   const [loginModal, setLoginModal] = useState<boolean>(false);
   const [registrationModal, setRegistrationModal] = useState<boolean>(false);
   const user = useAppSelector((state) => state.user);
   const navigate = useNavigate();

   function hideLoginModal() {
      setIsBurgerActive(false);
      setLoginModal(false);
   }
   function hideRegistrationModal() {
      setIsBurgerActive(false);
      setRegistrationModal(false);
   }
   function showLoginModal() {
      setIsBurgerActive(false);
      setRegistrationModal(false);
      setLoginModal(true);
   }
   function showRegistrationModal() {
      setIsBurgerActive(false);
      setLoginModal(false);
      setRegistrationModal(true);
   }

   function clickUserButton() {
      setIsBurgerActive(false);
      navigate(P_USER_LIKED);
   }
   function logout() {
      setIsBurgerActive(false);
      navigate(P_SHOP);
   }

   return (
      <>
         <header className="header">
            <div className="header__container __container">
               <div className="header__row">
                  <Logo onClick={() => setIsBurgerActive(false)} moreClass="header__logo" />
                  <div className={`header__buttons ${isBurgerActive ? '_active' : ''}`}>
                     {user.auth ? (
                        <SVGButton onClick={() => clickUserButton()} moreClass="header__button">
                           <svg
                              width="50"
                              height="50"
                              viewBox="0 0 50 50"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg">
                              <path
                                 d="M25 25C21.5625 25 18.6198 23.776 16.1719 21.3281C13.724 18.8802 12.5 15.9375 12.5 12.5C12.5 9.0625 13.724 6.11979 16.1719 3.67188C18.6198 1.22396 21.5625 0 25 0C28.4375 0 31.3802 1.22396 33.8281 3.67188C36.276 6.11979 37.5 9.0625 37.5 12.5C37.5 15.9375 36.276 18.8802 33.8281 21.3281C31.3802 23.776 28.4375 25 25 25ZM0 50V41.25C0 39.4792 0.456251 37.851 1.36875 36.3656C2.28125 34.8802 3.49167 33.7479 5 32.9688C8.22917 31.3542 11.5104 30.1427 14.8437 29.3344C18.1771 28.526 21.5625 28.1229 25 28.125C28.4375 28.125 31.8229 28.5292 35.1562 29.3375C38.4896 30.1458 41.7708 31.3563 45 32.9688C46.5104 33.75 47.7219 34.8833 48.6344 36.3687C49.5469 37.8542 50.0021 39.4813 50 41.25V50H0Z"
                                 fill="black"
                              />
                           </svg>
                        </SVGButton>
                     ) : null}

                     {user?.user?.roles && checkRoles(['ADMIN'], user.user.roles) ? (
                        <SimpleButton moreClass="header__button">АдминПанель</SimpleButton>
                     ) : null}

                     {user.auth ? (
                        <LogoutButton someFunc={() => logout()} />
                     ) : (
                        <SimpleButton onClick={() => showLoginModal()} moreClass="header__button">
                           Войти
                        </SimpleButton>
                     )}
                  </div>
                  <div
                     onClick={() => setIsBurgerActive((prev) => !prev)}
                     className={`header__burger burger ${isBurgerActive ? '_active' : ''}`}>
                     <span></span>
                     <span></span>
                     <span></span>
                  </div>
               </div>
            </div>
         </header>
         {user.auth ? null : (
            <>
               <LoginModal onHide={hideLoginModal} show={loginModal}>
                  Нет аккаунта? <span onClick={showRegistrationModal}>Зарегестрируйтесь</span>
               </LoginModal>
               <RegistrationModal onHide={hideRegistrationModal} show={registrationModal}>
                  Есть аккаунт? <span onClick={showLoginModal}>Войди</span>
               </RegistrationModal>
            </>
         )}
      </>
   );
};
