import { Link } from 'react-router-dom';

import {
  Drawer as MaterialDrawer,
  Typography,
  IconButton,
  List,
  ListItem,
} from '@material-tailwind/react';

export default function Drawer({ setDrawerOpen, drawerOpen, routesArr }) {
  return (
    <MaterialDrawer
      open={drawerOpen}
      onClose={() => setDrawerOpen(false)}
      placement='right'
    >
      <div className='mb-2 flex items-center justify-between p-4'>
        <Typography
          variant='h5'
          color='blue-gray'
        >
          Fakestore
        </Typography>
        <IconButton
          variant='text'
          color='blue-gray'
          onClick={() => setDrawerOpen(false)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={2}
            stroke='currentColor'
            className='h-5 w-5'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        </IconButton>
      </div>

      <List>
        {routesArr?.length &&
          routesArr.map(
            (r, i) =>
              i !== 0 && (
                <Link
                  to={r.route}
                  key={i}
                >
                  <ListItem className='ml-2'>{r.name}</ListItem>
                </Link>
              )
          )}
      </List>
    </MaterialDrawer>
  );
}
