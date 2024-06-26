import React from 'react';

import { Link } from 'react-router-dom';

import { Navbar, Typography, IconButton } from '@material-tailwind/react';
import Drawer from './Drawer';
import Tabs from './Tabs';

import { routesArr } from '../../constants';

export default function Appbar({ children }) {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setDrawerOpen(false)
    );
  }, []);

  return (
    <div className='w-full'>
      <Navbar className='sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4'>
        <div className='flex items-center justify-between text-blue-gray-900'>
          <Link to='/'>
            <Typography className='mr-4 cursor-pointer py-1.5 font-bold'>
              RGamesCenter
            </Typography>
          </Link>
          <div className='flex items-center gap-4'>
            <Tabs routesArr={routesArr} />
            <IconButton
              variant='text'
              className='ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden'
              ripple={false}
              onClick={() => setDrawerOpen(!drawerOpen)}
            >
              {drawerOpen ? (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  className='h-6 w-6'
                  viewBox='0 0 24 24'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M6 18L18 6M6 6l12 12'
                  />
                </svg>
              ) : (
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  className='h-6 w-6'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M4 6h16M4 12h16M4 18h16'
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
      </Navbar>
      <Drawer
        setDrawerOpen={setDrawerOpen}
        drawerOpen={drawerOpen}
        routesArr={routesArr}
      />

      {/* <div className='mx-auto max-w-screen-md py-12'>{children}</div> */}
      {children}
    </div>
  );
}
