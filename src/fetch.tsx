import { useInfiniteQuery } from '@tanstack/react-query';

import { useSearch } from '@/context/search-context';
import GraphqlRepository from '@/services/graphql-repository';

export const FetchData = () => {
  const { searchWord } = useSearch();
  console.log('searchWord', searchWord);

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
