import { LikeIcon } from '@/assets/icons/like';
import { ShareIcon } from '@/assets/icons/share';
import { Image } from '@/graphql/graphql';
import { cn } from '@/lib/utils';

interface CardProps {
  image: Image;
}

const PriceBadge = ({ price }: { price: string }) => {
  return (
    <div className='absolute left-0 top-0'>
      <div className='relative size-0 border-r-[120px] border-t-[120px] border-r-transparent border-t-white'>
        <span className='absolute left-0 top-[-90px] line-clamp-1 w-16 text-center text-sm'>
          {price} €
        </span>
      </div>
    </div>
  );
};

// TODO?: When clicked share icon, copy the image to clipboard
const ImageActions = ({ likesCount, liked }: { likesCount: number; liked: boolean }) => {
  return (
    <div className='invisible absolute bottom-2 right-4 flex flex-col gap-y-3 text-white group-hover:visible'>
      <div className='flex flex-col items-center gap-y-1'>
        <button onClick={() => console.log('like')}>
          <LikeIcon
            className={cn(
              'size-6 fill-none text-red-400 hover:text-red-500',
              liked && 'fill-current'
            )}
          />
        </button>
        <p>{likesCount}</p>
      </div>
      <div className='flex flex-col items-center gap-y-1'>
        <button>
          <ShareIcon className='size-6' />
        </button>
        <p>0</p>
      </div>
    </div>
  );
};

const FooterCard = ({ author, title }: { title: string; author: string }) => {
  return (
    <footer className='flex h-[100px] flex-col items-center justify-center border border-soft-gray px-2'>
      <h3 className='line-clamp-1 text-2xl uppercase'>{title}</h3>
      <p className='text-soft-gray'>
        by <span className='text-black'>{author}</span>
      </p>
    </footer>
  );
};

// TODO: Add the likes and download button? - Style it for mobile and desktop
// TODO: If no price, not show pricebadge (if not a single item has price, display it
// based on >200 likes a random price)
export const ImagesCard = ({ image }: CardProps) => {
  return (
    <div className='group mx-auto size-full'>
      <header className='relative'>
        <PriceBadge price='0.00' />
        {image.picture && (
          <>
            <picture>
              <img
                className='h-[360px] w-full object-cover'
                src={image.picture}
                alt={image.title ?? 'Image'}
              />
            </picture>
            {image.likesCount ? (
              <ImageActions likesCount={image.likesCount} liked={!!image.liked} />
            ) : null}
          </>
        )}
      </header>
      {image.author && image.title && <FooterCard author={image.author} title={image.title} />}
    </div>
  );
};
