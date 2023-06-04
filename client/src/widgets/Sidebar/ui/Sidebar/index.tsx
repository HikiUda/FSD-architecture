import { SVGButton } from 'shared/ui/SVGButton';
import './style.scss';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { SidebarPathModel } from 'widgets/Sidebar/model/sidebarModel';

interface SidebarProps {
   pathes: SidebarPathModel[];
}

const Sidebar: React.FC<SidebarProps> = ({ pathes }) => {
   const [isActive, setIsActive] = useState<boolean>(false);
   const location = useLocation();
   return (
      <>
         <SVGButton
            onClick={() => setIsActive((prev) => !prev)}
            moreClass={`sidebar-button ${isActive ? '_active' : ''}`}>
            <svg
               width="40"
               height="40"
               viewBox="0 0 40 40"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
               <path
                  d="M20 28L28 20L20 12L17.2 14.8L20.4 18H12V22H20.4L17.2 25.2L20 28ZM20 40C17.2333 40 14.6333 39.4747 12.2 38.424C9.76667 37.3733 7.65 35.9487 5.85 34.15C4.05 32.35 2.62533 30.2333 1.576 27.8C0.526667 25.3667 0.00133333 22.7667 0 20C0 17.2333 0.525333 14.6333 1.576 12.2C2.62667 9.76667 4.05133 7.65 5.85 5.85C7.65 4.05 9.76667 2.62533 12.2 1.576C14.6333 0.526667 17.2333 0.00133333 20 0C22.7667 0 25.3667 0.525333 27.8 1.576C30.2333 2.62667 32.35 4.05133 34.15 5.85C35.95 7.65 37.3753 9.76667 38.426 12.2C39.4767 14.6333 40.0013 17.2333 40 20C40 22.7667 39.4747 25.3667 38.424 27.8C37.3733 30.2333 35.9487 32.35 34.15 34.15C32.35 35.95 30.2333 37.3753 27.8 38.426C25.3667 39.4767 22.7667 40.0013 20 40Z"
                  fill="#9747FF"
               />
            </svg>
         </SVGButton>

         <aside className={`sidebar ${isActive ? '_active' : ''}`}>
            <aside className="sidebar__block">
               {pathes.map((path) => (
                  <Link
                     onClick={() => setIsActive(false)}
                     key={path.path}
                     to={path.path}
                     className={`sidebar__link ${
                        location.pathname.includes(path.path) ? '_active' : ''
                     }`}>
                     {path.nameLink}
                  </Link>
               ))}
            </aside>
         </aside>
      </>
   );
};

export default Sidebar;
