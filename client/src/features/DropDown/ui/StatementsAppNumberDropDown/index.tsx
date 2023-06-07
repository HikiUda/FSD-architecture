import { StatementsAppNumbers, StatementsAppTitles } from 'shared/model/StatementModel';
import DropDown from 'shared/ui/DropDown';

import styles from './styles.module.scss';

interface StatementsAppNumberDropDownProps {
   setAppNumber: (state: StatementsAppNumbers | null) => void;
}

const StatementsAppNumberDropDown: React.FC<StatementsAppNumberDropDownProps> = ({
   setAppNumber,
}) => {
   const list = [
      { title: 'Все заявления', func: () => setAppNumber(null) },
      { title: StatementsAppTitles.app1, func: () => setAppNumber(StatementsAppNumbers.app1) },
      { title: StatementsAppTitles.app2, func: () => setAppNumber(StatementsAppNumbers.app2) },
      { title: StatementsAppTitles.app3, func: () => setAppNumber(StatementsAppNumbers.app3) },
      { title: StatementsAppTitles.app4, func: () => setAppNumber(StatementsAppNumbers.app4) },
      { title: StatementsAppTitles.app5, func: () => setAppNumber(StatementsAppNumbers.app5) },
   ];
   return <DropDown moreTitleClasses={styles.title} list={list}></DropDown>;
};

export default StatementsAppNumberDropDown;
