import React from 'react';
import './style.scss';

interface SVGButtonProps {
   children?: React.ReactNode | null;
   moreClass?: string;
   onClick?: () => any;
}

export const SVGButton: React.FC<SVGButtonProps> = ({ children, moreClass = '', onClick }) => {
   return (
      <button onClick={onClick} className={`svg__button ${moreClass}`}>
         {children}
      </button>
   );
};
