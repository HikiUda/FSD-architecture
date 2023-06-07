import { Route, Routes } from 'react-router-dom';
import { ShopPage } from './ShopPage';
import { Header } from 'widgets/Header';
import DevicePage from './DevicePage';
import UserPage from './UserPage';
import { useEffect } from 'react';
import { fetchUserAuth } from 'shared/store/userStore/fetchUserAuth';
import { useAppDispatch } from 'shared/lib/hooks';
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

export const Routing = () => {
   const dispatch = useAppDispatch();
   useEffect(() => {
      dispatch(fetchUserAuth());
   }, [dispatch]);
   return (
      <>
         <Header />
         <Routes>
            <Route path={P_SHOP} element={<ShopPage />} />
            <Route path={`${P_DEVICE}/:id`} element={<DevicePage />} />

            <Route path={P_USER} element={<UserPage />}>
               <Route path={P_USER_LIKED} element={<UserLiked />} />
               <Route path={P_USER_CART} element={<UserCart />} />
               <Route path={`${P_USER_CART}/:basketDeviceId`} element={<DeviceInfoCart />} />
               <Route path={P_USER_CHAT} element={<div>{P_USER_CHAT}</div>} />
               <Route path={P_USER_MYPRODUCT} element={<div>{P_USER_MYPRODUCT}</div>} />
               <Route path={P_USER_PURCHES} element={<UserPurches />} />
               <Route path={`${P_USER_PURCHES}/:purchesId`} element={<DeviceInfoPurches />} />
               <Route path={P_USER_STATEMENT} element={<div>{P_USER_STATEMENT}</div>} />
               <Route path={P_USER_SUPPORT} element={<div>{P_USER_SUPPORT}</div>} />
            </Route>
            <Route path={P_ADMIN} element={<AdminPage />}>
               <Route path={P_ADMIN_STATEMENT} element={<AdminStatementList />} />
               <Route path={`${P_ADMIN_STATEMENT}/:statementId`} element={<StatementInfo />} />
               <Route path={P_ADMIN_CHAT} element={<div>{P_ADMIN_CHAT} </div>} />
            </Route>
         </Routes>
      </>
   );
};
