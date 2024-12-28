import {
  InfiniteData,
  infiniteQueryOptions,
  QueryClient,
  QueryKey,
  UseMutationOptions,
} from '@tanstack/react-query';

import type {
  GetImagesQuery,
  GetImagesQueryVariables,
  ImageFieldsFragment,
  LikeImageMutation,
  TypedDocumentString,
} from '@/graphql/graphql';
import { getImagesQuery } from '@/queries/get-images';
import { likeImageMutation } from '@/queries/mutate-like-image';

type QueryTypes = 'getImages' | 'mutateLikes';

interface ImageLikeOptionsVariables {
  imageId: string;
  newLikesCount: number;
  isLiked: boolean;
}

class GraphqlRepository {
  private endpoint = import.meta.env.VITE_GRAPHQL_ENDPOINT;
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

  protected getRootQueryKey(queryType: QueryTypes) {
    switch (queryType) {
      case 'getImages':
        return 'get-images';
      case 'mutateLikes':
        return 'mutate-image-like';
      default:
        return '';
    }
  }

  getQueryClient() {
    return this.queryClient;
  }

  getImagesQueryOptions(variables: GetImagesQueryVariables) {
    return infiniteQueryOptions({
      queryKey: [this.getRootQueryKey('getImages'), variables],
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

  mutateImageLikeOptions(
    imageId: string
  ): UseMutationOptions<
    LikeImageMutation,
    Error,
    ImageLikeOptionsVariables,
    [QueryKey, InfiniteData<GetImagesQuery['images']> | null | undefined][]
  > {
    return {
      mutationKey: [this.getRootQueryKey('mutateLikes'), imageId],
      mutationFn: async variables => {
        const { imageId } = variables;
        const res = await this.execute<LikeImageMutation, { imageId: string }>(likeImageMutation, {
          imageId,
        });
        return res.data;
      },
      onMutate: async variables => {
        const queryClient = this.getQueryClient();
        const getImagesQueries: [
          QueryKey,
          InfiniteData<GetImagesQuery['images']> | null | undefined,
        ][] = queryClient.getQueriesData({
          predicate: query => query.queryKey.includes(this.getRootQueryKey('getImages')),
        });

        getImagesQueries.forEach(async ([queryKey]) => {
          await queryClient.cancelQueries({ queryKey });
          queryClient.setQueryData<InfiniteData<GetImagesQuery['images']> | null | undefined>(
            queryKey,
            oldData => {
              if (oldData) {
                return {
                  ...oldData,
                  pages: oldData.pages.map(page => {
                    return {
                      ...page,
                      nodes: page.nodes?.map(image =>
                        (image as ImageFieldsFragment).id === variables.imageId
                          ? {
                              ...image,
                              likesCount: variables.newLikesCount,
                              liked: variables.isLiked,
                            }
                          : image
                      ),
                    };
                  }),
                };
              }
            }
          );
        });

        return getImagesQueries;
      },
      onError: (_err, _variables, context) => {
        context?.forEach(([queryKey, previousData]) => {
          this.getQueryClient().setQueryData(queryKey, previousData);
        });
      },
      onSettled: () => {
        this.getQueryClient().invalidateQueries({
          predicate: query => query.queryKey.includes(this.getRootQueryKey('getImages')),
        });
      },
    };
  }
}

export default new GraphqlRepository();
