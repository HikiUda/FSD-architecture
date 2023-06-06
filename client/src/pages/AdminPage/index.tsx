import { Outlet } from 'react-router-dom';
import Sidebar from 'widgets/Sidebar';
import { adminPathes } from './lib/pathes';

const AdminPage = () => {
   return (
      <div className="wrapper __container">
         <Sidebar pathes={adminPathes} />
         <main className="main">
            <Outlet />
         </main>
      </div>
   );
};

export default AdminPage;
