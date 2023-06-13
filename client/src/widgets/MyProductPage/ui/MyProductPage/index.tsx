import useMyProducts from 'widgets/MyProductPage/lib/hooks/useMyProducts';
import StatementBar from '../StatementBar';
import styles from './styles.module.scss';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ClipLoader } from 'react-spinners';
import { DeviceCardForVendor } from 'features/DeviceCardForVendor';
import { useBrands, useInput, useTypes } from 'shared/lib/hooks';
import { MainInput } from 'shared/ui/MainInput';
import { BrandTypeDropDown } from 'features/BrandTypeDropDown';

const MyProductPage = () => {
   const [pageNumber, setPageNumber] = useState<number>(1);
   const [brandId, setBrandId] = useState<number>(0);
   const [typeId, setTypeId] = useState<number>(0);
   const { value: searchValue, changeValue: changeSearchValue } = useInput('');

   const { loading, error, hasMore, myproducts } = useMyProducts(
      pageNumber,
      searchValue,
      brandId,
      typeId,
   );
   const { value: brandSearchValue, changeValue: setBrandSearchValue } = useInput('');
   const { value: typeSearchValue, changeValue: setTypeSearchValue } = useInput('');

   const { brands } = useBrands(brandSearchValue);
   const { types } = useTypes(typeSearchValue);

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
      <div className={styles.myproduct}>
         <div className={styles.row}>
            <MainInput
               value={searchValue}
               setValue={changeSearchValue}
               placeholder="Поиск по названию..."
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
         <div className={styles.myproduct__tape}>
            {myproducts.map((device, index) => {
               return myproducts.length === index + 1 ? (
                  <DeviceCardForVendor
                     key={device.id}
                     device={device}
                     refElement={lastCardElementRef}
                  />
               ) : (
                  <DeviceCardForVendor key={device.id} device={device} />
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
         </div>
         <StatementBar moreClasses={styles.myproduct__statementbar} />
      </div>
   );
};

export default MyProductPage;
