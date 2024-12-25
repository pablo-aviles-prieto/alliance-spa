import { ImagesCard } from '@/components/cards/images-card';
import { GridContainer } from '@/components/grid-container';
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
