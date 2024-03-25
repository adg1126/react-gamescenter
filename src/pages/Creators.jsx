import { useSelector } from 'react-redux';
import { selectCreatorsArr } from '../redux/gamesSlice';

import { Typography } from '@material-tailwind/react';

import { Card } from '../components/Card';

export default function Creators() {
  const creatorsArr = useSelector(selectCreatorsArr);

  return (
    <section className='mt-8 flex flex-col items-center gap-y-8'>
      <div className='flex flex-col items-center gap-y-4'>
        <Typography
          variant='h1'
          color='blue-gray'
          className='font-bold'
        >
          ALL CREATORS
        </Typography>
      </div>
      <div className='overflow-hidden w-5/6 h-full flex flex-row flex-wrap gap-12 justify-center'>
        {creatorsArr?.length > 0 &&
          creatorsArr?.map((c, i) => (
            <Card
              key={i}
              backgroundImage={c.image}
              title={c.name}
              paragraphsArr={[
                { title: 'Games Count', paragraph: c.games_count },
                {
                  title: 'Position',
                  paragraph: c?.positions.map((p, i) =>
                    p.length - 1 === i ? ` ${p.name}` : ` ${p.name},`
                  ),
                },
                {
                  title: 'Games',
                  paragraph: c?.games.map((g, i) =>
                    g.length - 1 === i ? ` ${g.name}` : ` ${g.name},`
                  ),
                },
              ]}
              footer={<></>}
              cardFlex='col'
            />
          ))}
      </div>
    </section>
  );
}
