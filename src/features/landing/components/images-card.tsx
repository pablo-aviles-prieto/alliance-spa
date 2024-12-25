import { LikeIcon } from '@/assets/icons/like';
import { ShareIcon } from '@/assets/icons/share';
import { Image } from '@/graphql/graphql';
import { cn } from '@/lib/utils';

interface CardProps {
  image: Image;
}

interface ImageActionsProps {
  likesCount: number;
  liked: boolean;
}

interface LikeSectionProps extends ImageActionsProps {
  className?: string;
}

interface FooterProps extends ImageActionsProps {
  title: string;
  author: string;
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

const LikeSection = ({ likesCount, liked, className }: LikeSectionProps) => {
  return (
    <div className={cn('flex items-center justify-center gap-1 sm:flex-col', className)}>
      <p className='sm:order-1'>{likesCount}</p>
      <button onClick={() => console.log('like')}>
        <LikeIcon
          className={cn('size-6 text-red-400 hover:text-red-500', liked && 'fill-current')}
        />
      </button>
    </div>
  );
};

const ShareSection = ({ className }: { className?: string }) => {
  return (
    <div className={cn('flex items-center justify-center gap-1 sm:flex-col', className)}>
      <p className='sm:order-1'>0</p>
      <button>
        <ShareIcon className='size-6' />
      </button>
    </div>
  );
};

// TODO?: When clicked share icon, copy the image to clipboard
const ImageActions = ({ likesCount, liked }: ImageActionsProps) => {
  return (
    <div className='invisible absolute bottom-2 right-4 flex flex-col gap-y-3 text-white sm:group-hover:visible'>
      <LikeSection liked={liked} likesCount={likesCount} />
      <ShareSection />
    </div>
  );
};

const Footer = ({ author, title, liked, likesCount }: FooterProps) => {
  return (
    <footer>
      <div className='flex h-[100px] flex-col items-center justify-center border border-soft-gray px-2'>
        <h3 className='line-clamp-1 text-2xl uppercase'>{title}</h3>
        <p className='text-soft-gray'>
          by <span className='text-black'>{author}</span>
        </p>
      </div>
      <div className='flex h-14 border border-t-0 border-soft-gray sm:hidden'>
        <LikeSection
          className='w-full border-r border-soft-gray'
          liked={liked}
          likesCount={likesCount}
        />
        <ShareSection className='w-full' />
      </div>
    </footer>
  );
};

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
      {image.author && image.title && image.likesCount ? (
        <Footer
          author={image.author}
          title={image.title}
          liked={!!image.liked}
          likesCount={image.likesCount}
        />
      ) : null}
    </div>
  );
};
