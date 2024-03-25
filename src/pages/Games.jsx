import { useSelector, useDispatch } from 'react-redux';
import {
  selectCurrrentPageGamesArr,
  selectCurrentPageIndex,
  setCurrentPageIndex,
  selectPageSize,
  setPageSize,
} from '../redux/gamesSlice';

import {
  Typography,
  IconButton,
  Button,
  Input,
} from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { Card } from '../components/Card';
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { usePagination, DOTS } from '../components/usePagination';

export default function Games() {
  const dispatch = useDispatch();
  const currentPageGameArr = useSelector(selectCurrrentPageGamesArr),
    currentPageIndex = useSelector(selectCurrentPageIndex),
    pageSize = useSelector(selectPageSize);

  const next = () => {
    if (currentPageIndex === 20) return;
    dispatch(setCurrentPageIndex(currentPageIndex + 1));
  };

  const prev = () => {
    if (currentPageIndex === 1) return;
    dispatch(setCurrentPageIndex(currentPageIndex - 1));
  };

  const getItemProps = (index) => ({
    variant: currentPageIndex === index ? 'filled' : 'text',
    color: 'gray',
    onClick: () => dispatch(setCurrentPageIndex(index)),
  });

  const totalCount = 200,
    siblingCount = 1;

  const paginationRange = usePagination({
    currentPageIndex,
    totalCount,
    siblingCount,
    pageSize,
  });

  const handleSetPageSize = (e) => {
    dispatch(setPageSize(e.target.value));
  };

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

        <div className='flex items-center gap-8'>
          <Button
            variant='text'
            className='flex items-center gap-2'
            onClick={prev}
            disabled={currentPageGameArr === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} /> Previous
          </Button>
          <div className='flex items-center gap-2'>
            {paginationRange.map((pageNumber, i) => {
              if (pageNumber === DOTS) {
                return (
                  <IconButton
                    key={i}
                    {...getItemProps(pageNumber)}
                  >
                    {pageNumber}
                  </IconButton>
                );
              }

              return (
                <IconButton
                  key={i}
                  {...getItemProps(pageNumber)}
                >
                  {pageNumber}
                </IconButton>
              );
            })}
          </div>
          <Button
            variant='text'
            className='flex items-center gap-2'
            onClick={next}
            disabled={currentPageGameArr === 5}
          >
            Next
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </div>
        <div>
          <Input
            type='number'
            onChange={handleSetPageSize}
            className='w-full'
            variant='standard'
            label='Games per page (max 100)'
            placeholder='$1'
            min={1}
            max={100}
            value={pageSize}
          />
        </div>
      </div>
      <div className='overflow-hidden w-5/6 h-full flex flex-row flex-wrap gap-12 justify-center'>
        {currentPageGameArr?.length > 0 &&
          currentPageGameArr.map((g, i) => (
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
