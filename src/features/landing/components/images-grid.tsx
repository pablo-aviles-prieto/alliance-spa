import { GridContainer } from '@/components/containers/grid-container';
import { ImagesCard } from '@/features/landing/components/images-card/images-card';
import { ImageFieldsFragment } from '@/graphql/graphql';

interface ImagesGridProps {
  imagesData: ImageFieldsFragment[];
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
