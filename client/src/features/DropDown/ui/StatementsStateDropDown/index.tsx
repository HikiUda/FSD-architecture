import { StatementsStates } from 'shared/model/StatementModel';
import DropDown from 'shared/ui/DropDown';

interface StatementsStateDropDownProps {
   setState: (state: StatementsStates | null) => void;
}

const StatementsStateDropDown: React.FC<StatementsStateDropDownProps> = ({ setState }) => {
   const list = [
      { title: 'Все Состояния', func: () => setState(null) },
      { title: StatementsStates.ACCEPT, func: () => setState(StatementsStates.ACCEPT) },
      { title: StatementsStates.REJECTED, func: () => setState(StatementsStates.REJECTED) },
      { title: StatementsStates.PENDING, func: () => setState(StatementsStates.PENDING) },
   ];
   return <DropDown list={list}></DropDown>;
};

export default StatementsStateDropDown;
