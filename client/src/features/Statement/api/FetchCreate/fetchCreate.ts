import { IOneStatement, StatementsAppNumbers } from 'shared/model/StatementModel';
import { fetchCreateAdmin } from './fetchCreateAdmin';
import { fetchCreateVendor } from './fetchCreateVendor';
import { fetchCreateDevice } from './fetchCreateDevice';
import { fetchCreateBrand } from './fetchCreateBrand';
import { fetchCreateType } from './fetchCreateType';

export function fetchCreate(statement: IOneStatement) {
   const appNumber = statement.appNumber;
   try {
      if (appNumber === StatementsAppNumbers.app1) {
         fetchCreateAdmin(statement.userId);
      } else if (appNumber === StatementsAppNumbers.app2) {
         fetchCreateVendor(statement.userId);
      } else if (appNumber === StatementsAppNumbers.app3) {
         fetchCreateDevice(statement.info);
      } else if (appNumber === StatementsAppNumbers.app4) {
         fetchCreateBrand(statement.info);
      } else if (appNumber === StatementsAppNumbers.app5) {
         fetchCreateType(statement.info);
      }
   } catch (e) {
      console.log(e);
   }
}
