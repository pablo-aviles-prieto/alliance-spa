import { infiniteQueryOptions } from '@tanstack/react-query';
import { GetImagesQuery, GetImagesQueryVariables, TypedDocumentString } from '../graphql/graphql';
import { getImagesQuery } from '../queries/get-images';

class GraphqlClient {
  private endpoint: string = 'https://sandbox-api-test.samyroad.com/graphql';

  protected async execute<TResult, TVariables>(
    query: TypedDocumentString<TResult, TVariables>,
    ...[variables]: TVariables extends Record<string, never> ? [] : [TVariables]
  ): Promise<{ data: TResult }> {
    const response = await fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/graphql-response+json',
      },
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.json();
  }

  getImagesQueryOptions(variables: GetImagesQueryVariables) {
    return infiniteQueryOptions({
      queryKey: ['images', variables],
      queryFn: async ({ pageParam }) => {
        console.log('pageParam', pageParam);
        const enhancedVariables = pageParam ? { ...variables, after: pageParam } : variables;
        const result = await this.execute<GetImagesQuery, GetImagesQueryVariables>(
          getImagesQuery,
          enhancedVariables
        );
        return result.data.images;
      },
      getNextPageParam: lastPage => {
        return lastPage.pageInfo.hasNextPage ? lastPage.pageInfo.endCursor : undefined;
      },
      initialPageParam: undefined as string | undefined,
    });
  }
}

export default new GraphqlClient();
