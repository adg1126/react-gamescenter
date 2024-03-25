import { useSelector } from 'react-redux';
import { Typography, Chip } from '@material-tailwind/react';

import {
  selectStoresArr,
  selectStoresPageSize,
  selectStoresCurrentPageIndex,
  setStoresPageSize,
  setStoresCurrentPageIndex,
} from '../redux/gamesSlice';

import { Card } from '../components/Card';
import Pagination from '../components/Pagination';
export default function Stores() {
  const storesArr = useSelector(selectStoresArr),
    currentPageIndex = useSelector(selectStoresCurrentPageIndex),
    pageSize = useSelector(selectStoresPageSize);

  return (
    <section className='mt-8 flex flex-col items-center gap-y-8'>
      <div className='flex flex-col items-center gap-y-4'>
        <Typography
          variant='h1'
          color='blue-gray'
          className='font-bold'
        >
          ALL STORES
        </Typography>

        {storesArr?.length > 0 && (
          <Pagination
            currentPageIndex={currentPageIndex}
            setCurrentPageIndex={setStoresCurrentPageIndex}
            pageSize={pageSize}
            setPageSize={setStoresPageSize}
            totalCount={storesArr.length}
            siblingCount={1}
          />
        )}
      </div>
      <div className='overflow-hidden w-5/6 h-full flex flex-row flex-wrap gap-12 justify-center'>
        {storesArr?.length > 0 &&
          storesArr.slice(0, 9).map((s, i) => (
            <Card
              key={i}
              backgroundImage={s.image_background}
              title={s.name}
              paragraphsArr={[
                { title: 'Games Count', paragraph: s.games_count },
                { title: 'Domain', paragraph: s.domain },
              ]}
              footer={
                <div className='flex flex-wrap gap-1'>
                  {s.games.map((g, i) => (
                    <Chip
                      key={i}
                      value={g.name}
                      className='rounded-full'
                      size='sm'
                    />
                  ))}
                </div>
              }
            />
          ))}
      </div>
    </section>
  );
}
