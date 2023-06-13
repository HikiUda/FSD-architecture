import DeviceCardForUser from 'features/DeviceCardForUser';
import './style.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useBrands, useInput, useTypes } from 'shared/lib/hooks';
import useDevices from 'widgets/ShopLent/lib/hooks/useDevices';
import { ClipLoader } from 'react-spinners';
import { BrandTypeDropDown } from 'features/BrandTypeDropDown';

export const ShopLent = () => {
   const [pageNumber, setPageNumber] = useState<number>(1);
   const [brandId, setBrandId] = useState<number>(0);
   const [typeId, setTypeId] = useState<number>(0);

   const { value: searchValue, changeValue: changeSearchValue } = useInput('');
   const { value: brandSearchValue, changeValue: setBrandSearchValue } = useInput('');
   const { value: typeSearchValue, changeValue: setTypeSearchValue } = useInput('');
   const { brands } = useBrands(brandSearchValue);
   const { types } = useTypes(typeSearchValue);

   const { loading, error, hasMore, devices } = useDevices(
      pageNumber,
      searchValue,
      brandId,
      typeId,
   );

   useEffect(() => {
      setPageNumber(1);
   }, [searchValue]);

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
                  <BrandTypeDropDown
                     placeholder="Поиск по брэнду..."
                     list={brands}
                     searchValue={brandSearchValue}
                     setSearchValue={setBrandSearchValue}
                     callback={(id: number) => setBrandId(id)}
                  />
                  <BrandTypeDropDown
                     placeholder="Поиск по типу..."
                     list={types}
                     searchValue={typeSearchValue}
                     setSearchValue={setTypeSearchValue}
                     callback={(id: number) => setTypeId(id)}
                  />
               </div>
            </div>
         </div>
         <div className="shop-tape">
            <div className="shop-tape__container __container">
               <div className="shop-tape__tape">
                  {devices.map((device, index) => {
                     return devices.length === index + 1 ? (
                        <DeviceCardForUser
                           refElement={lastCardElementRef}
                           key={device.id}
                           device={device}
                           moreClasses="shop-tape__card"
                        />
                     ) : (
                        <DeviceCardForUser
                           key={device.id}
                           device={device}
                           moreClasses="shop-tape__card"
                        />
                     );
                  })}
               </div>
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
            </div>
         </div>
      </div>
   );
};
