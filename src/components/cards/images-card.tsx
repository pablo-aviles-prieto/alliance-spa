import { Image } from '@/graphql/graphql';

interface CardProps {
  image: Image;
}

export const ImagesCard = ({ image }: CardProps) => {
  return (
    <div className='mx-auto size-full'>
      <div className='relative'>
        <div className='absolute left-0 top-0'>
          <div className='relative size-0 border-r-[120px] border-t-[120px] border-r-transparent border-t-white'>
            <span className='absolute left-0 top-[-90px] line-clamp-1 w-16 text-center text-sm'>
              {image.price ?? '0.00'} €
            </span>
          </div>
        </div>
        <picture>
          <img
            className='h-[360px] w-full object-cover'
            src={image.picture ?? ''}
            alt={image.title ?? ''}
          />
        </picture>
      </div>
      <div className='flex h-[100px] flex-col items-center justify-center border border-soft-gray px-2'>
        <h3 className='line-clamp-1 text-2xl uppercase'>{image.title}</h3>
        <p className='text-soft-gray'>
          by <span className='text-black'>{image.author}</span>
        </p>
      </div>
    </div>
  );
};
