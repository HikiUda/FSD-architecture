import DeviceCardForUser from 'features/DeviceCardForUser';
import './style.scss';
import { IOneDevice } from 'shared/model/DeviceModel';
import { useEffect, useState } from 'react';
import { fetchDevices } from 'widgets/ShopLent/api/devices';
import { useInput } from 'shared/lib/hooks';

export const ShopLent = () => {
   const [devices, setDevices] = useState<IOneDevice[]>([]);

   const { value: searchValue, changeValue: changeSearchValue } = useInput();

   useEffect(() => {
      fetchDevices(10, 1, searchValue).then((data) =>
         data ? setDevices((prev) => [...prev, ...data]) : null,
      );
   }, []);
   return (
      <div>
         <div className="search">
            <div className="search__container __container">
               <div className="search__row">
                  <input
                     value={searchValue}
                     onChange={changeSearchValue}
                     type="text"
                     placeholder="Поиск по названию"
                     className="search__input input-search perple-underline"
                  />
                  <input
                     type="text"
                     placeholder="Поиск по типу"
                     className="search__input input-search perple-underline"
                  />
                  <input
                     type="text"
                     placeholder="Поиск по бренду"
                     className="input-search search__input perple-underline"
                  />
               </div>
            </div>
         </div>
         <div className="shop-tape">
            <div className="shop-tape__container __container">
               <div className="shop-tape__tape">
                  {devices.map((device) => (
                     <DeviceCardForUser
                        key={device.id}
                        device={device}
                        moreClasses="shop-tape__card"
                     />
                  ))}
               </div>
            </div>
         </div>
      </div>
   );
};
