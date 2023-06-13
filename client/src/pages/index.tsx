import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import { ShopPage } from './ShopPage';
import { Header } from 'widgets/Header';
import DevicePage from './DevicePage';
import UserPage from './UserPage';
import { useEffect } from 'react';
import { fetchUserAuth } from 'shared/store/userStore/fetchUserAuth';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks';
import UserLiked from 'widgets/UserLiked';
import {
   P_ADMIN,
   P_ADMIN_CHAT,
   P_ADMIN_STATEMENT,
   P_DEVICE,
   P_SHOP,
   P_USER,
   P_USER_CART,
   P_USER_CHAT,
   P_USER_LIKED,
   P_USER_MYPRODUCT,
   P_USER_MYPRODUCT_EDITDEVICE,
   P_USER_PURCHES,
   P_USER_STATEMENT,
   P_USER_SUPPORT,
} from 'shared/lib/pathes';
import UserCart from 'widgets/UserCart/ui/UserCart';
import { DeviceInfoCart } from 'widgets/DeviceInfo';
import { UserPurches } from 'widgets/UserPurches';
import DeviceInfoPurches from 'widgets/DeviceInfo/ui/DeviceInfoPurches';
import AdminPage from './AdminPage';
import { AdminStatementList } from 'widgets/AdminStatement';
import { StatementInfo } from 'widgets/StatementInfo';
import { checkRoles } from 'shared/lib/functions/checkRoles';
import UserStatementList from 'widgets/AdminStatement/ui/UesrStatement';
import { MyProductPage } from 'widgets/MyProductPage';
import { DeviceEditor } from 'widgets/DeviceEditor';
import { ChatAdminList, ChatUserList } from 'widgets/Chat';
import PreChat from 'widgets/Chat/ui/PreChat';
import SupportChat from 'widgets/Chat/ui/SupportChat';

export const Routing = () => {
   const dispatch = useAppDispatch();
   const { user } = useAppSelector((state) => state);
   useEffect(() => {
      dispatch(fetchUserAuth());
   }, [dispatch]);
   return (
      <>
         <Header />
         <Routes>
            <Route path={P_SHOP} element={<ShopPage />} />
            <Route path={`${P_DEVICE}/:id`} element={<DevicePage />} />

            {user.auth && (
               <Route path={P_USER} element={<UserPage />}>
                  <Route path={P_USER_LIKED} element={<UserLiked />} />
                  <Route path={P_USER_CART} element={<UserCart />} />
                  <Route path={`${P_USER_CART}/:basketDeviceId`} element={<DeviceInfoCart />} />
                  <Route path={P_USER_CHAT} element={<ChatUserList />} />
                  <Route path={`${P_USER_CHAT}/:chatId`} element={<PreChat />} />
                  <Route path={P_USER_MYPRODUCT} element={<MyProductPage />} />
                  {user?.user?.roles && checkRoles(['VENDOR'], user.user.roles) && (
                     <>
                        <Route path={P_USER_MYPRODUCT_EDITDEVICE} element={<DeviceEditor />} />
                        <Route
                           path={`${P_USER_MYPRODUCT_EDITDEVICE}/:deviceId`}
                           element={<DeviceEditor />}
                        />
                     </>
                  )}

                  <Route path={P_USER_PURCHES} element={<UserPurches />} />
                  <Route path={`${P_USER_PURCHES}/:purchesId`} element={<DeviceInfoPurches />} />
                  <Route path={P_USER_STATEMENT} element={<UserStatementList />} />
                  <Route path={`${P_USER_STATEMENT}/:statementId`} element={<StatementInfo />} />
                  <Route path={P_USER_SUPPORT} element={<SupportChat />} />
               </Route>
            )}
            {user?.user?.roles && checkRoles(['ADMIN'], user.user.roles) && (
               <Route path={P_ADMIN} element={<AdminPage />}>
                  <Route path={P_ADMIN_STATEMENT} element={<AdminStatementList />} />
                  <Route path={`${P_ADMIN_STATEMENT}/:statementId`} element={<StatementInfo />} />
                  <Route path={P_ADMIN_CHAT} element={<ChatAdminList />} />
                  <Route path={`${P_ADMIN_CHAT}/:chatId`} element={<PreChat />} />
               </Route>
            )}
            <Route path="*" element={<Navigate to={P_SHOP} />} />
         </Routes>
      </>
   );
};
