import { useSelector } from 'react-redux';
import {
  selectGamesPaginationCurrrentPageGamesArr,
  selectGamesPaginationCurrentPageIndex,
  setGamesPaginationCurrentPageIndex,
  selectGamesPaginationPageSize,
  setGamesPaginationPageSize,
} from '../redux/gamesSlice';

import { Typography, Button } from '@material-tailwind/react';

import { Card } from '../components/Card';
import Pagination from '../components/Pagination';

export default function Games() {
  const currentPageGameArr = useSelector(
      selectGamesPaginationCurrrentPageGamesArr
    ),
    currentPageIndex = useSelector(selectGamesPaginationCurrentPageIndex),
    pageSize = useSelector(selectGamesPaginationPageSize);

  return (
    <section className='mt-8 flex flex-col items-center gap-y-8'>
      <div className='flex flex-col items-center gap-y-4'>
        <Typography
          variant='h1'
          color='blue-gray'
          className='font-bold'
        >
          ALL GAMES
        </Typography>

        <Pagination
          currentPageIndex={currentPageIndex}
          setCurrentPageIndex={setGamesPaginationCurrentPageIndex}
          pageSize={pageSize}
          setPageSize={setGamesPaginationPageSize}
          totalCount={200}
          siblingCount={1}
        />
      </div>
      <div className='overflow-hidden w-5/6 h-full flex flex-row flex-wrap gap-12 justify-center'>
        {currentPageGameArr?.length > 0 &&
          currentPageGameArr?.map((g, i) => (
            <Card
              key={i}
              backgroundImage={g.background_image}
              title={g.name}
              paragraphsArr={[
                { title: 'Release Date', paragraph: g.released },
                { title: 'Updated', paragraph: g.updated },
              ]}
              footer={
                <Button
                  size='lg'
                  fullWidth={true}
                >
                  See more
                </Button>
              }
              cardFlex='col'
            />
          ))}
      </div>
    </section>
  );
}
