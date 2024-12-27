import { infiniteQueryOptions, QueryClient, UseMutationOptions } from '@tanstack/react-query';

import type {
  GetImagesQuery,
  GetImagesQueryVariables,
  LikeImageMutation,
  TypedDocumentString,
} from '@/graphql/graphql';
import { getImagesQuery } from '@/queries/get-images';
import { likeImageMutation } from '@/queries/mutate-like-image';

// TODO: Extract the endpoint in a env variable
class GraphqlRepository {
  private endpoint = 'https://sandbox-api-test.samyroad.com/graphql';
  private queryClient = new QueryClient();

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

  getQueryClient() {
    return this.queryClient;
  }

  getImagesQueryOptions(variables: GetImagesQueryVariables) {
    return infiniteQueryOptions({
      queryKey: ['get-images', variables],
      queryFn: async ({ pageParam }) => {
        const enhancedVariables = pageParam ? { ...variables, after: pageParam } : variables;
        const result = await this.execute<GetImagesQuery, GetImagesQueryVariables>(
          getImagesQuery,
          enhancedVariables
        );
        return result.data.images;
      },
      getNextPageParam: ({ pageInfo }) => {
        return pageInfo.hasNextPage ? pageInfo.endCursor : undefined;
      },
      initialPageParam: undefined as string | undefined,
    });
  }

  // TODO: Use optimistic update, using onMutate to invalidate all the queries from the infiniteQuery
  // retrieving the data of all the queries made starting with get-images and iterating to modify the concrete
  // object by image id, change the like count and passing the data to onError/onSettled
  // https://tanstack.com/query/v4/docs/framework/react/guides/optimistic-updates
  // https://github.com/TanStack/query/discussions/3360
  mutateImageLikeOptions(
    imageId: string
  ): UseMutationOptions<LikeImageMutation, Error, { imageId: string; newLikesCount: number }> {
    return {
      mutationKey: ['mutate-image-like', imageId],
      mutationFn: async (variables: { imageId: string; newLikesCount: number }) => {
        const { imageId } = variables;
        const res = await this.execute<LikeImageMutation, { imageId: string }>(likeImageMutation, {
          imageId,
        });
        return res.data;
      },
      onMutate: async variables => {
        console.log('onmutate variables', variables);
      },
      onSuccess: res => {
        console.log('onsuccess res', res);
        this.getQueryClient().invalidateQueries({
          predicate: query => query.queryKey.includes('get-images'),
        });
      },
    };
  }
}

export default new GraphqlRepository();
