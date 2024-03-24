import { useSelector, useDispatch } from 'react-redux';
import {
  selectGenresArr,
  setGenresSectionFilterGenre,
  selectGenresSectionFilterGenre,
  fetchGamesByGenre,
  selectGenresSectionGamesArrFilteredByGenre,
  selectGamesArr,
} from '../redux/gamesSlice';

import { Typography, Select, Option } from '@material-tailwind/react';
import { Card } from './Card';
import { useEffect } from 'react';

export default function Genres() {
  const genresArr = useSelector(selectGenresArr),
    filterGenre = useSelector(selectGenresSectionFilterGenre),
    filteredGamesArr = useSelector(selectGenresSectionGamesArrFilteredByGenre),
    gamesArr = useSelector(selectGamesArr);
  const dispatch = useDispatch();

  const handleSetGenre = (genre) => {
    dispatch(setGenresSectionFilterGenre(genre));
  };

  useEffect(() => {
    if (filterGenre?.length > 0) {
      dispatch(fetchGamesByGenre(filterGenre));
    }
  }, [dispatch, filterGenre]);

  return (
    <section className='mt-32 flex flex-col items-center gap-y-8'>
      <div className='flex flex-col gap-y-2'>
        <Typography
          variant='h1'
          color='blue-gray'
          className='font-bold'
        >
          FILTER BY GENRES
        </Typography>
        <div>
          {genresArr?.length && (
            <Select
              variant='standard'
              label='Default'
              onChange={handleSetGenre}
              value={filterGenre}
            >
              {genresArr?.length &&
                genresArr.map((g, i) => (
                  <Option
                    key={i}
                    value={g.slug}
                  >
                    {g.name}
                  </Option>
                ))}
            </Select>
          )}
        </div>
      </div>
      <div className='overflow-hidden w-5/6 h-full flex flex-row flex-wrap gap-12 justify-center'>
        {filteredGamesArr?.length > 0 && filterGenre?.length
          ? filteredGamesArr.slice(0, 9).map((g, i) => (
              <Card
                key={i}
                {...g}
              />
            ))
          : gamesArr.slice(0, 9).map((g, i) => (
              <Card
                key={i}
                {...g}
              />
            ))}
      </div>
    </section>
  );
}
