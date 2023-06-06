import { ListCardConsole } from 'entities/ListCard';
import ListCardWrapper from 'entities/ListCard/ui/ListCardWrapper';
import { ListCardStatement } from 'features/ListCard';
import { useState } from 'react';
import { useInput } from 'shared/lib/hooks';
import DropDown from 'shared/ui/DropDown';
import { MainInput } from 'shared/ui/MainInput';
import useAdminStatements from 'widgets/AdminStatement/lib/hooks/useAdminStatements';

const AdminStatementList = () => {
   const [pageNumber, setPageNumber] = useState<number>(1);
   const { loading, error, statements, hasMore } = useAdminStatements(pageNumber);
   const { value: userId, changeValue: changeUserId } = useInput('');
   return (
      <>
         <ListCardConsole>
            <DropDown />
            <MainInput value={userId} setValue={changeUserId} />
         </ListCardConsole>
         <ListCardWrapper>
            {statements.map((statement) => {
               return <ListCardStatement key={statement.id} statement={statement} />;
            })}
         </ListCardWrapper>
      </>
   );
};

export default AdminStatementList;
