import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { usePagination, DOTS } from '../components/usePagination';

import { IconButton, Button, Input } from '@material-tailwind/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch } from 'react-redux';

export default function Pagination({
  currentPageIndex,
  setCurrentPageIndex,
  pageSize,
  setPageSize,
  totalCount,
  siblingCount,
}) {
  const dispatch = useDispatch();

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

  const paginationRange = usePagination({
    currentPageIndex,
    totalCount,
    siblingCount,
    pageSize,
  });

  const handleSetPageSize = (e) => {
    dispatch(setPageSize(e.target.value));
  };

  const first = paginationRange[0],
    last = paginationRange[paginationRange.length - 1];

  return (
    <>
      <div className='flex items-center gap-8'>
        <Button
          variant='text'
          className='flex items-center gap-2'
          onClick={prev}
          disabled={currentPageIndex === first}
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
          disabled={currentPageIndex === last}
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
    </>
  );
}
