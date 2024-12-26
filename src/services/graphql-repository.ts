import { infiniteQueryOptions, QueryClient, UseMutationOptions } from '@tanstack/react-query';

import type {
  GetImagesQuery,
  GetImagesQueryVariables,
  LikeImageMutation,
  TypedDocumentString,
} from '@/graphql/graphql';
import { getImagesQuery } from '@/queries/get-images';
import { likeImageMutation } from '@/queries/mutate-like-image';

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

  mutateImageLikeOptions(imageId: string): UseMutationOptions {
    return {
      mutationKey: ['mutate-image-like', imageId],
      mutationFn: async () => {
        const res = await this.execute<LikeImageMutation, { imageId: string }>(likeImageMutation, {
          imageId,
        });
        return res.data;
      },
      onSuccess: () => {
        this.getQueryClient().invalidateQueries({
          predicate: query => {
            return query.queryKey.includes('get-images');
          },
        });
      },
    };
  }
}

export default new GraphqlRepository();
