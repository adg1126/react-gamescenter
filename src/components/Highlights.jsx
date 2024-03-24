import { useSelector } from 'react-redux';
import { selectGamesArr } from '../redux/gamesSlice';
import { Typography, Button } from '@material-tailwind/react';
import { Card } from './Card';

export default function Highlights() {
  const gamesArr = useSelector(selectGamesArr);

  return (
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
        {gamesArr?.length > 0 &&
          gamesArr.slice(0, 9).map((g, i) => (
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
