import { ImageActions } from '@/features/landing/components/images-card/actions';
import { Footer } from '@/features/landing/components/images-card/footer';
import { PriceBadge } from '@/features/landing/components/images-card/price-badge';
import { Image, Maybe } from '@/graphql/graphql';

interface CardProps {
  image: Image;
}

export const ImagesCard = ({ image }: CardProps) => {
  const displayPrice = (
    price: Maybe<number> | undefined,
    likesCount: Maybe<number> | undefined
  ) => {
    if (price) return price.toString();
    if (likesCount && likesCount > 200) return `${likesCount}.00`;

    return '0';
  };

  return (
    <div className='group mx-auto size-full'>
      <header className='relative'>
        {image.price || (image.likesCount && image.likesCount > 200) ? (
          <PriceBadge price={displayPrice(image.price, image.likesCount)} />
        ) : null}
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
