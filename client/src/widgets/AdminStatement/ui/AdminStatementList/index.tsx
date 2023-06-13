import { ListCardConsole } from 'entities/ListCard';
import ListCardWrapper from 'entities/ListCard/ui/ListCardWrapper';
import { StatementsStateDropDown, StatementsAppNumberDropDown } from 'features/DropDown';
import { ListCardStatement } from 'features/ListCard';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { StatementsAppNumbers, StatementsStates } from 'shared/model/StatementModel';
import useAdminStatements from 'widgets/AdminStatement/lib/hooks/useAdminStatements';

const AdminStatementList = () => {
   const [pageNumber, setPageNumber] = useState<number>(1);
   const [state, setState] = useState<StatementsStates | null>(null);
   const [appNumber, setAppNumber] = useState<StatementsAppNumbers | null>(null);
   const { loading, error, statements, hasMore } = useAdminStatements(pageNumber, state, appNumber);

   useEffect(() => {
      setPageNumber(1);
   }, [state, appNumber]);

   const observer = useRef<IntersectionObserver | undefined>();
   const lastCardElementRef = useCallback(
      (node: HTMLElement) => {
         if (loading) return;
         if (observer.current) observer.current.disconnect();
         observer.current = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting && hasMore) {
               setPageNumber((prevPageNumber) => prevPageNumber + 1);
               observer.current?.unobserve(entries[0].target);
            }
         });
         if (node) observer.current.observe(node);
      },
      [loading, hasMore],
   );

   return (
      <>
         <ListCardConsole>
            <StatementsStateDropDown setState={setState} />
            <StatementsAppNumberDropDown setAppNumber={setAppNumber} />
         </ListCardConsole>
         <ListCardWrapper>
            {statements.map((statement, index) => {
               return statements.length === index + 1 ? (
                  <ListCardStatement
                     refElement={lastCardElementRef}
                     key={statement.id}
                     statement={statement}
                  />
               ) : (
                  <ListCardStatement key={statement.id} statement={statement} />
               );
            })}
            {loading && (
               <ClipLoader
                  color={'#54fa34'}
                  loading={true}
                  size={150}
                  aria-label="Loading Spinner"
                  data-testid="loader"
               />
            )}
            {error || null}
         </ListCardWrapper>
      </>
   );
};

export default AdminStatementList;
