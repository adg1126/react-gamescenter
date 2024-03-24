import {
  Card as MaterialCard,
  CardBody,
  Typography,
} from '@material-tailwind/react';

export function Card(props) {
  const { backgroundImage, title, paragraphsArr, footer, cardFlex } = props;
  return (
    <MaterialCard
      className={`w-full shadow-lg ${
        cardFlex === 'col'
          ? 'flex-col max-w-[350px]'
          : 'md:flex-row max-w-[500px]'
      }`}
    >
      {cardFlex?.length ? (
        <>
          <img
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            src={backgroundImage}
            alt={title}
          />
          <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
        </>
      ) : (
        <div className='md:w-2/5'>
          <img
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            src={backgroundImage}
            alt={title}
          />
          <div className='to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 ' />
        </div>
      )}

      <CardBody className={`${cardFlex ? '' : 'md:w-3/5'}`}>
        <div className='mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-y-1'>
          <Typography
            variant='h5'
            color='blue-gray'
            className='font-bold'
          >
            {title}
          </Typography>
        </div>
        <div>
          {paragraphsArr.map((p, i) => (
            <div
              key={i}
              className='flex flex-row'
            >
              <Typography
                variant='paragraph'
                color='gray'
                className='font-semibold'
              >
                {p.title}:
              </Typography>
              <Typography
                className='ml-2'
                variant='paragraph'
                color='gray'
              >
                {p.paragraph}
              </Typography>
            </div>
          ))}
        </div>
        <div className='mt-3'>{footer}</div>
      </CardBody>
    </MaterialCard>
  );
}
