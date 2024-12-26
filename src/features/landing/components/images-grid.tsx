import { GridContainer } from '@/components/containers/grid-container';
import { ImagesCard } from '@/features/landing/components/images-card/images-card';
import { Image } from '@/graphql/graphql';

interface ImagesGridProps {
  imagesData: Image[];
}

export const ImagesGrid = ({ imagesData }: ImagesGridProps) => {
  return (
    <GridContainer>
      {imagesData.map(image => (
        <ImagesCard key={image.id} image={image} />
      ))}
    </GridContainer>
  );
};
