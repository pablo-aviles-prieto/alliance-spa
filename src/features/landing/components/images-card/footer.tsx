import { LikeSection, ShareSection } from '@/features/landing/components/images-card/actions';
import { Image } from '@/graphql/graphql';

interface FooterProps {
  image: Image;
}

export const Footer = ({ image }: FooterProps) => {
  return (
    <footer>
      <div className='flex h-[100px] flex-col items-center justify-center border border-soft-gray px-2'>
        <h3 className='line-clamp-1 text-2xl uppercase'>{image.title}</h3>
        <p className='text-soft-gray'>
          by <span className='text-black'>{image.author}</span>
        </p>
      </div>
      <div className='flex h-14 border border-t-0 border-soft-gray sm:hidden'>
        {image.likesCount ? (
          <LikeSection
            className='w-full border-r border-soft-gray'
            liked={!!image.liked}
            likesCount={image.likesCount}
            imageId={image.id}
          />
        ) : null}
        <ShareSection className='w-full' />
      </div>
    </footer>
  );
};
