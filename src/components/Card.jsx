import {
  Card as MaterialCard,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from '@material-tailwind/react';

export function Card(props) {
  const { background_image, name, released, updated, rating } = props;
  return (
    <MaterialCard className='w-full max-w-[350px] shadow-lg'>
      <img
        style={{ width: '100%', height: '100%', objectFit: 'contain' }}
        src={background_image}
        alt={name}
      />
      <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
      <CardBody>
        <div className='mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-y-1'>
          <Typography
            variant='h5'
            color='blue-gray'
            className='font-bold'
          >
            {name}
          </Typography>
          <Typography
            color='blue-gray'
            className='flex items-center gap-1.5 font-normal'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 24 24'
              fill='currentColor'
              className='-mt-0.5 h-5 w-5 text-yellow-700'
            >
              <path
                fillRule='evenodd'
                d='M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z'
                clipRule='evenodd'
              />
            </svg>
            {rating}
          </Typography>
        </div>
        <div>
          <Typography
            variant='paragraph'
            color='gray'
          >
            Release Date: {released}
          </Typography>
          <Typography
            variant='paragraph'
            color='gray'
          >
            Updated: {updated}
          </Typography>
        </div>
      </CardBody>
      <CardFooter className='pt-3'>
        <Button
          size='lg'
          fullWidth={true}
        >
          See more
        </Button>
      </CardFooter>
    </MaterialCard>
  );
}
