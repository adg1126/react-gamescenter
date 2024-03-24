import { useSelector } from 'react-redux';
import { selectStoresArr } from '../redux/gamesSlice';

import { Card } from './Card';
import { Typography, Chip } from '@material-tailwind/react';

export default function OurStore() {
  const storesArr = useSelector(selectStoresArr);

  return (
    <section className='mt-32 flex flex-col items-center gap-y-8'>
      <div>
        <Typography
          variant='h1'
          color='blue-gray'
          className='font-bold'
        >
          STORES
        </Typography>
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
