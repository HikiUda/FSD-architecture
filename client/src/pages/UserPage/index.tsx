import { Outlet } from 'react-router-dom';
import Sidebar from 'widgets/Sidebar';
import { userPathes } from './lib/pathes';

const UserPage = () => {
   return (
      <div className="wrapper __container">
         <Sidebar pathes={userPathes} />
         <main className="main">
            <Outlet />
         </main>
      </div>
   );
};

export default UserPage;
