import { GridContainer } from '@/components/containers/grid-container';
import { ImagesCard } from '@/features/landing/components/images-card/images-card';
import { SkeletonImagesCard } from '@/features/landing/components/images-card/skeleton';
import { ImageFieldsFragment } from '@/graphql/graphql';

interface ImagesGridProps {
  imagesData: ImageFieldsFragment[];
  isLoading: boolean;
}

export const ImagesGrid = ({ imagesData, isLoading }: ImagesGridProps) => {
  return (
    <GridContainer>
      {isLoading
        ? Array.from({ length: 6 }, (_, index) => <SkeletonImagesCard key={index} />)
        : imagesData.map(image => <ImagesCard key={image.id} image={image} />)}
    </GridContainer>
  );
};
