import { SimpleButton } from 'shared/ui/SimpleButton';
import styles from './styles.module.scss';
import { useState } from 'react';
import { BrandTypeStatementModal, RoleStatementModal } from 'features/ModalStatements';
import { StatementsAppNumbers } from 'shared/model/StatementModel';
import { useAppSelector } from 'shared/lib/hooks';
import { checkRoles } from 'shared/lib/functions/checkRoles';
import { useNavigate } from 'react-router-dom';
import { P_USER_MYPRODUCT_EDITDEVICE } from 'shared/lib/pathes';

interface StatementBarProps {
   moreClasses?: string;
}

const StatementBar: React.FC<StatementBarProps> = ({ moreClasses }) => {
   const { user } = useAppSelector((state) => state);
   const [showBrand, setShowBrand] = useState<boolean>(false);
   const [showType, setShowType] = useState<boolean>(false);
   const [showRoleAdmin, setShowRoleAdmin] = useState<boolean>(false);
   const [showRoleVendor, setShowRoleVendor] = useState<boolean>(false);

   const navigate = useNavigate();

   return (
      <div className={`${styles.statementbar} ${moreClasses}`}>
         <div className={styles.statementbar_block}>
            {user?.user?.roles && checkRoles(['VENDOR'], user.user.roles) && (
               <SimpleButton onClick={() => navigate(P_USER_MYPRODUCT_EDITDEVICE)}>
                  Создать дивайс
               </SimpleButton>
            )}
            {user?.user?.roles && checkRoles(['VENDOR', 'ADMIN'], user.user.roles) && (
               <>
                  <SimpleButton onClick={() => setShowBrand(true)}>Создать Брэнд</SimpleButton>
                  <SimpleButton onClick={() => setShowType(true)}>Создать Тип</SimpleButton>
               </>
            )}
            {user?.user?.roles && !checkRoles(['VENDOR'], user.user.roles) && (
               <SimpleButton onClick={() => setShowRoleVendor(true)}>Стать Продовцом</SimpleButton>
            )}
            {user?.user?.roles && !checkRoles(['ADMIN'], user.user.roles) && (
               <SimpleButton onClick={() => setShowRoleAdmin(true)}>Стать Админом</SimpleButton>
            )}
         </div>
         <BrandTypeStatementModal
            appNumber={StatementsAppNumbers.app4}
            show={showBrand}
            onHide={() => setShowBrand(false)}
         />
         <BrandTypeStatementModal
            appNumber={StatementsAppNumbers.app5}
            show={showType}
            onHide={() => setShowType(false)}
         />
         <RoleStatementModal
            appNumber={StatementsAppNumbers.app1}
            show={showRoleAdmin}
            onHide={() => setShowRoleAdmin(false)}
         />
         <RoleStatementModal
            appNumber={StatementsAppNumbers.app2}
            show={showRoleVendor}
            onHide={() => setShowRoleVendor(false)}
         />
      </div>
   );
};

export default StatementBar;
