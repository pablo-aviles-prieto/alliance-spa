import { useQuery } from '@tanstack/react-query';
import { graphql } from './graphql';
import { GetImagesQuery, GetImagesQueryVariables } from './graphql/graphql';
import { execute } from './graphql/execute';

const getImagesQuery = graphql(`
  query GetImages($after: String, $first: Int = 20) {
    images(first: $first, after: $after) {
      nodes {
        id
        title
        picture
        author
        likesCount
        liked
        createdAt
        updatedAt
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);

export const FetchData = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['images'],
    queryFn: async () => {
      // const variables: GetImagesQueryVariables = undefined;
      return execute<GetImagesQuery, GetImagesQueryVariables>(getImagesQuery, {});
    },
  });

  console.log('data', data);
  console.log('error', error);
  console.log('isLoading', isLoading);

  return <div>Check</div>;
};
