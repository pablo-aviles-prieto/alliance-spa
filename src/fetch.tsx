import { useInfiniteQuery } from '@tanstack/react-query';
import GraphqlClient from './services/graphql-client';

export const FetchData = () => {
  const { data, isLoading, hasNextPage, fetchNextPage } = useInfiniteQuery(
    GraphqlClient.getImagesQueryOptions({})
  );

  console.log('data', data);
  console.log('isLoading', isLoading);
  console.log('hasNextPage', hasNextPage);

  const flattenedImages = data?.pages.flatMap(page => page.nodes) || [];
  console.log('flattenedImages', flattenedImages);

  return (
    <>
      <div>Check</div>
      {hasNextPage && <button onClick={() => fetchNextPage()}>Load more</button>}
    </>
  );
};
