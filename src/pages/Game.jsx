import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchGame,
  selectGameGame,
  selectGameStatus,
} from '../redux/gamesSlice';

import { Typography } from '@material-tailwind/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faDesktop, faGlobe, faTag } from '@fortawesome/free-solid-svg-icons';

import { useLocation } from 'react-router-dom';

export default function Game() {
  const dispatch = useDispatch();
  const gameStatus = useSelector(selectGameStatus),
    game = useSelector(selectGameGame);
  let location = useLocation();
  let gameId = location.pathname.slice(7);

  useEffect(() => {
    if (gameStatus === 'idle') {
      dispatch(fetchGame(gameId));
    }
  });

  return Object.keys(game).length === 0 ? (
    <></>
  ) : (
    <>
      {/* Hero */}
      <section className='w-full relative h-[calc(100vh-60px)] md:h-screen flex md:block flex-col justify-center'>
        <div className='flex flex-row justify-end'>
          {/* bannerVerticalOverlay */}
          <div
            className='flex flex-col absolute w-full h-[calc(100vh-60px)] items-center md:items-start justify-center'
            style={{
              background:
                'linear-gradient(0deg, #fff 0%, #fff 0%, #fff 1%, transparent)',
            }}
          >
            {/* banner content */}
            <div className='flex flex-col relative z-20 ml-[2em] w-5/6 lg:w-1/2 gap-y-6'>
              <Typography
                variant='h1'
                color='blue-gray'
                className='font-bold'
              >
                {game.name}
              </Typography>
              <div className='flex flex-col gap-y-2'>
                <div className='flex flex-row items-center gap-x-4'>
                  <FontAwesomeIcon icon={faClock} />
                  <Typography
                    variant='paragraph'
                    color='gray'
                    className='font-semibold'
                  >
                    RELEASE DATE:
                  </Typography>
                  <Typography
                    className='ml-2'
                    variant='paragraph'
                    color='gray'
                  >
                    {game.released}
                  </Typography>
                </div>
                <div className='flex flex-row items-center gap-x-4'>
                  <FontAwesomeIcon icon={faDesktop} />
                  <Typography
                    variant='paragraph'
                    color='gray'
                    className='font-semibold'
                  >
                    PLATFORMS:
                  </Typography>
                  <Typography
                    className='ml-2'
                    variant='paragraph'
                    color='gray'
                  >
                    {game?.platforms.map((p, i) =>
                      game.platforms.length - 1 === i
                        ? ` ${p.platform.name}`
                        : ` ${p.platform.name},`
                    )}
                  </Typography>
                </div>
                <div className='flex flex-row items-center gap-x-4'>
                  <FontAwesomeIcon icon={faDesktop} />
                  <Typography
                    variant='paragraph'
                    color='gray'
                    className='font-semibold'
                  >
                    DEVELOPERS:
                  </Typography>
                  <Typography
                    className='ml-2'
                    variant='paragraph'
                    color='gray'
                  >
                    {game?.developers.map((d, i) =>
                      game.developers.length - 1 === i
                        ? ` ${d.name}`
                        : ` ${d.name},`
                    )}
                  </Typography>
                </div>
                <div className='flex flex-row items-center gap-x-4'>
                  <FontAwesomeIcon icon={faTag} />
                  <Typography
                    variant='paragraph'
                    color='gray'
                    className='font-semibold'
                  >
                    GENRES:
                  </Typography>
                  <Typography
                    className='ml-2'
                    variant='paragraph'
                    color='gray'
                  >
                    {game?.genres.map((g, i) =>
                      game.genres.length - 1 === i
                        ? ` ${g.name}`
                        : ` ${g.name},`
                    )}
                  </Typography>
                </div>
                <div className='flex flex-row items-center gap-x-4'>
                  <FontAwesomeIcon icon={faGlobe} />
                  <Typography
                    variant='paragraph'
                    color='gray'
                    className='font-semibold'
                  >
                    PUBLISHER:
                  </Typography>
                  <Typography
                    className='ml-2'
                    variant='paragraph'
                    color='gray'
                  >
                    {game?.publishers.map((p, i) =>
                      game.publishers.length - 1 === i
                        ? ` ${p.name}`
                        : ` ${p.name},`
                    )}
                  </Typography>
                </div>
              </div>
            </div>
          </div>

          {/* bannerImage */}
          <img
            src={game.background_image}
            alt='banner-image'
            className='h-[calc(100vh-60px)] pointer-events-none select-none object-cover'
          />

          {/* bannerHorizontalOverlay */}
          <div
            className='absolute w-full h-[calc(100vh-60px)]'
            style={{
              background:
                'linear-gradient(0deg, #fff 0%, #fff 0%, #fff 1%, transparent)',
            }}
          />
        </div>
      </section>
      <section className='mt-8 flex flex-col items-center gap-y-8'>
        <div className='w-5/6 flex flex-col items-center gap-y-4'>
          <Typography
            variant='h2'
            color='blue-gray'
            className='font-bold'
          >
            DESCRIPTION
          </Typography>
          <div className='flex flex-col gap-y-6'>
            {game?.description
              ?.split(/<\/?[^>]*>/g)
              .filter(Boolean)
              .map((p, i) => (
                <Typography
                  key={i}
                  variant='paragraph'
                >
                  {p}
                </Typography>
              ))}
          </div>
        </div>
        <div className='overflow-hidden w-5/6 h-full flex flex-row flex-wrap gap-12 justify-center'></div>
      </section>
    </>
  );
}
