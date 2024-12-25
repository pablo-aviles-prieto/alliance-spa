import { useInfiniteQuery } from '@tanstack/react-query';

import { LayoutContentContainer } from '@/components/containers/content-layout';
import { useSearch } from '@/context/search-context';
import { ImagesGrid } from '@/features/landing/components/images-grid';
import GraphqlRepository from '@/services/graphql-repository';
import { nonNullable } from '@/utils/non-nullable';

export const MainContent = () => {
  const { searchWord } = useSearch();

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    GraphqlRepository.getImagesQueryOptions({ title: searchWord || undefined })
  );

  const flattenedImages = data?.pages.flatMap(page => page.nodes).filter(nonNullable) || [];

  // TODO: Add the observe for infinite query
  // TODO: Style when the flattenedImages has 0 length
  // TODO: Add a placeholder when loading data
  return (
    <main className='bg-secondary'>
      <LayoutContentContainer
        as='main'
        className='min-h-[calc(100vh-var(--header-height))] py-7 xl:py-14'
      >
        <ImagesGrid imagesData={flattenedImages} />
        {hasNextPage && (
          <button className='bg-blue-500' onClick={() => fetchNextPage()}>
            Load more
          </button>
        )}
      </LayoutContentContainer>
    </main>
  );
};
