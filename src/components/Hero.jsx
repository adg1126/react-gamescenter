import { useSelector } from 'react-redux';
import { selectBannerGame } from '../redux/gamesSlice';

import { Typography, Button } from '@material-tailwind/react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-regular-svg-icons';
import { faDesktop, faGlobe, faTag } from '@fortawesome/free-solid-svg-icons';

export default function Hero() {
  const bannerGame = useSelector(selectBannerGame);

  return Object.keys(bannerGame).length === 0 ? (
    <></>
  ) : (
    // container
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
              {bannerGame.name}
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
                  {bannerGame.released}
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
                  {bannerGame?.platforms.map((p, i) =>
                    bannerGame.platforms.length - 1 === i
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
                  {bannerGame?.developers.map((d, i) =>
                    bannerGame.developers.length - 1 === i
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
                  {bannerGame?.genres.map((g, i) =>
                    bannerGame.genres.length - 1 === i
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
                  {bannerGame?.publishers.map((p, i) =>
                    bannerGame.publishers.length - 1 === i
                      ? ` ${p.name}`
                      : ` ${p.name},`
                  )}
                </Typography>
              </div>
            </div>
            <div>
              <Button size='lg'>See more</Button>
            </div>
          </div>
        </div>

        {/* bannerImage */}
        <img
          src={bannerGame.background_image}
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
  );
}
