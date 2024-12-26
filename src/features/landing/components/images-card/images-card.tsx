import { ImageActions } from '@/features/landing/components/images-card/actions';
import { Footer } from '@/features/landing/components/images-card/footer';
import { PriceBadge } from '@/features/landing/components/images-card/price-badge';
import { Image } from '@/graphql/graphql';

interface CardProps {
  image: Image;
}

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
            </picture>{' '}
            {image.likesCount ? (
              <ImageActions
                imageId={image.id}
                likesCount={image.likesCount}
                liked={!!image.liked}
                imageUrl={image.picture}
              />
            ) : null}
          </>
        )}
      </header>
      <Footer image={image} />
    </div>
  );
};
