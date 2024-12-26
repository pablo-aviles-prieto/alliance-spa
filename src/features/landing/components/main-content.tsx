import { useRef } from 'react';

import { useInfiniteQuery } from '@tanstack/react-query';

import { LayoutContentContainer } from '@/components/containers/content-layout';
import { Spinner } from '@/components/loaders/spinner';
import { useSearch } from '@/context/search-context';
import { ImagesGrid } from '@/features/landing/components/images-grid';
import useIntersection from '@/hooks/use-intersection';
import GraphqlRepository from '@/services/graphql-repository';
import { nonNullable } from '@/utils/non-nullable';

export const MainContent = () => {
  const { searchWord } = useSearch();
  const nextPageRef = useRef<HTMLDivElement>(null);

  const { data, hasNextPage, fetchNextPage, isLoading, isFetchingNextPage } = useInfiniteQuery(
    GraphqlRepository.getImagesQueryOptions({ title: searchWord || undefined })
  );
  console.log('isLoading', isLoading);
  console.log('isFetchingNextPage', isFetchingNextPage);

  const intersectionCallback = (isIntersecting: boolean) => {
    if (isIntersecting && hasNextPage) fetchNextPage();
  };
  useIntersection(nextPageRef, intersectionCallback);

  const flattenedImages = data?.pages.flatMap(page => page.nodes).filter(nonNullable) || [];

  // TODO: Style when the flattenedImages has 0 length
  // TODO: Add a placeholder when loading data
  return (
    <main className='bg-secondary'>
      <LayoutContentContainer
        as='main'
        className='min-h-[calc(100vh-var(--header-height))] py-7 xl:py-14'
      >
        <ImagesGrid imagesData={flattenedImages} />
        {isFetchingNextPage && (
          <div className='my-6 flex items-center justify-center'>
            <Spinner />
          </div>
        )}
        {hasNextPage && <div ref={nextPageRef} />}
      </LayoutContentContainer>
    </main>
  );
};
