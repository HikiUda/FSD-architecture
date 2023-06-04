import React from 'react';
import './style.scss';

interface SimpleButtonProps {
   children?: React.ReactNode | string | null;
   moreClass?: string;
   onClick?: () => any;
}

export const SimpleButton: React.FC<SimpleButtonProps> = ({
   children,
   moreClass = '',
   onClick,
}) => {
   return (
      <button onClick={onClick} className={`blue__button ${moreClass}`}>
         {children}
      </button>
   );
};
