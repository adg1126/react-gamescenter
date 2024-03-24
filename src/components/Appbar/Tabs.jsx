import { List, ListItem } from '@material-tailwind/react';
import { Link } from 'react-router-dom';

export default function Tabs({ routesArr }) {
  return (
    <div className='mr-4 hidden lg:block'>
      <List className='mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6'>
        {routesArr?.length &&
          routesArr.map(
            (r, i) =>
              i !== 0 && (
                <Link
                  to={r.route}
                  key={i}
                >
                  <ListItem className='p-1 font-normal'>{r.name}</ListItem>
                </Link>
              )
          )}
      </List>
    </div>
  );
}
