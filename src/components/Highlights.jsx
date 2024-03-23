import { useSelector } from 'react-redux';
import { selectGamesArr } from '../redux/gamesSlice';
import { Card } from './Card';
import { Typography } from '@material-tailwind/react';

export default function Highlights() {
  const gamesArr = useSelector(selectGamesArr);

  return (
    gamesArr?.length && (
      <section className='mt-8 flex flex-col items-center gap-y-8'>
        <div>
          <Typography
            variant='h1'
            color='blue-gray'
            className='font-bold'
          >
            TRENDING GAMES
          </Typography>
        </div>
        <div className='overflow-hidden w-5/6 h-full flex flex-row flex-wrap gap-12 justify-center'>
          {gamesArr.slice(0, 9).map((g, i) => (
            <Card
              key={i}
              {...g}
            />
          ))}
        </div>
      </section>
    )
  );
}
