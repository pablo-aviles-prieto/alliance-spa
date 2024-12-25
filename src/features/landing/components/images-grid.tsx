import { Image } from '@/graphql/graphql';

interface ImagesGridProps {
  imagesData: Image[];
}

interface CardProps {
  image: Image;
}
const Card = ({ image }: CardProps) => {
  return (
    <div className='mx-auto h-[460px] w-[25rem]'>
      <div className='relative'>
        <picture>
          <img
            className='h-[360px] w-[400px] object-cover'
            src={image.picture ?? ''}
            alt={image.title ?? ''}
          />
        </picture>
      </div>
      <div className='flex h-[100px] flex-col items-center justify-center border border-soft-gray'>
        <h3>{image.title}</h3>
        <p>by {image.author}</p>
      </div>
    </div>
  );
};

export const ImagesGrid = ({ imagesData }: ImagesGridProps) => {
  return (
    <div className='grid grid-cols-auto-fit-400 gap-10'>
      {imagesData?.map(image => <Card key={image.id} image={image} />)}
    </div>
  );
};
