/* eslint-disable */
import * as types from './graphql';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
const documents = {
  '\n  fragment ImageFields on Image {\n    id\n    title\n    picture\n    author\n    likesCount\n    liked\n    createdAt\n    updatedAt\n  }\n':
    types.ImageFieldsFragmentDoc,
  '\n  query GetImages($after: String, $title: String, $first: Int = 20) {\n    images(first: $first, after: $after, title: $title) {\n      nodes {\n        ...ImageFields\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n':
    types.GetImagesDocument,
  '\n  mutation LikeImage($imageId: ID!) {\n    likeImage(input: { imageId: $imageId }) {\n      image {\n        ...ImageFields\n      }\n    }\n  }\n':
    types.LikeImageDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  fragment ImageFields on Image {\n    id\n    title\n    picture\n    author\n    likesCount\n    liked\n    createdAt\n    updatedAt\n  }\n'
): typeof import('./graphql').ImageFieldsFragmentDoc;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  query GetImages($after: String, $title: String, $first: Int = 20) {\n    images(first: $first, after: $after, title: $title) {\n      nodes {\n        ...ImageFields\n      }\n      pageInfo {\n        hasNextPage\n        endCursor\n      }\n    }\n  }\n'
): typeof import('./graphql').GetImagesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(
  source: '\n  mutation LikeImage($imageId: ID!) {\n    likeImage(input: { imageId: $imageId }) {\n      image {\n        ...ImageFields\n      }\n    }\n  }\n'
): typeof import('./graphql').LikeImageDocument;

export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
