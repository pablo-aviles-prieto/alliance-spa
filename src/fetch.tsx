import { useInfiniteQuery } from '@tanstack/react-query';

import GraphqlRepository from '@/services/graphql-repository';

export const FetchData = () => {
  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery(
    GraphqlRepository.getImagesQueryOptions({})
  );

  const flattenedImages = data?.pages.flatMap(page => page.nodes) || [];
  console.log('flattenedImages', flattenedImages);

  return (
    <>
      <div className='text-red-300'>Check</div>
      {hasNextPage && (
        <button className='bg-blue-500' onClick={() => fetchNextPage()}>
          Load more
        </button>
      )}
    </>
  );
};
