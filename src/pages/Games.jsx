import { useSelector, useDispatch } from 'react-redux';
import {
  selectGamesPaginationCurrrentPageGamesArr,
  selectGamesPaginationCurrentPageIndex,
  setGamesPaginationCurrentPageIndex,
  selectGamesPaginationPageSize,
  setGamesPaginationPageSize,
  selectGenresArr,
  setGamesPaginationFilterOptionsGenre,
  selectGamesPaginationFilterOptionsGenre,
  selectPlatformsArr,
  selectGamesPaginationFilterOptionsPlatform,
  setGamesPaginationFilterOptionsPlatforms,
} from '../redux/gamesSlice';

import { Typography, Button, Select, Option } from '@material-tailwind/react';

import { Card } from '../components/Card';
import Pagination from '../components/Pagination';

import { Link } from 'react-router-dom';

export default function Games() {
  const dispatch = useDispatch();
  const currentPageGameArr = useSelector(
      selectGamesPaginationCurrrentPageGamesArr
    ),
    currentPageIndex = useSelector(selectGamesPaginationCurrentPageIndex),
    pageSize = useSelector(selectGamesPaginationPageSize),
    genresArr = useSelector(selectGenresArr),
    filterOpsGenre = useSelector(selectGamesPaginationFilterOptionsGenre),
    platformsArr = useSelector(selectPlatformsArr),
    filterOpsPlatform = useSelector(selectGamesPaginationFilterOptionsPlatform);

  const handleSetGenre = (genre) => {
    dispatch(setGamesPaginationFilterOptionsGenre(genre));
  };

  const handleSetPlatform = (platform) => {
    dispatch(setGamesPaginationFilterOptionsPlatforms(platform));
  };

  return (
    <section className='mt-8 flex flex-col items-center gap-y-8'>
      <div className='flex flex-col items-center gap-y-10'>
        <Typography
          variant='h1'
          color='blue-gray'
          className='font-bold'
        >
          ALL GAMES
        </Typography>

        {currentPageGameArr.length > 0 && (
          <Pagination
            currentPageIndex={currentPageIndex}
            setCurrentPageIndex={setGamesPaginationCurrentPageIndex}
            pageSize={pageSize}
            setPageSize={setGamesPaginationPageSize}
            totalCount={200}
            siblingCount={1}
          />
        )}

        <div className='flex gap-6'>
          {genresArr.length > 0 && (
            <Select
              variant='standard'
              label='Genres'
              onChange={handleSetGenre}
              value={filterOpsGenre}
            >
              {genresArr.length > 0 &&
                genresArr?.map((g, i) => (
                  <Option
                    key={i}
                    value={g.slug}
                  >
                    {g.name}
                  </Option>
                ))}
            </Select>
          )}
          {platformsArr.length > 0 && (
            <Select
              variant='standard'
              label='Plaforms'
              onChange={handleSetPlatform}
              value={filterOpsPlatform}
            >
              {platformsArr.length > 0 &&
                platformsArr?.map((p, i) => (
                  <Option
                    key={i}
                    value={`${p.id}`}
                  >
                    {p.name}
                  </Option>
                ))}
            </Select>
          )}
        </div>
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
                <Link to={`/games/${g.id}`}>
                  <Button
                    size='lg'
                    fullWidth={true}
                  >
                    See more
                  </Button>
                </Link>
              }
              cardFlex='col'
            />
          ))}
      </div>
    </section>
  );
}
