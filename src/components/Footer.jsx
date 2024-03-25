import { Typography } from '@material-tailwind/react';
import { routesArr } from '../constants/index';

import { Link } from 'react-router-dom';

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className='flex w-full mt-32 md:px-10 relative bottom-0 flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between'>
      <Typography
        color='blue-gray'
        className='font-normal'
      >
        &copy; {currentYear} Material Tailwind
      </Typography>
      <ul className='flex flex-wrap items-center gap-y-2 gap-x-8'>
        {routesArr?.length &&
          routesArr.map(
            (r, i) =>
              i !== 0 && (
                <Link
                  to={r.route}
                  key={i}
                >
                  <li>
                    <Typography
                      as='a'
                      href='#'
                      color='blue-gray'
                      className='font-normal transition-colors hover:text-blue-500 focus:text-blue-500'
                    >
                      {r.name}
                    </Typography>
                  </li>
                </Link>
              )
          )}
      </ul>
    </footer>
  );
}
