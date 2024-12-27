import { graphql } from '@/graphql';

export const getImagesQuery = graphql(`
  query GetImages($after: String, $title: String, $first: Int = 20) {
    images(first: $first, after: $after, title: $title) {
      nodes {
        ...ImageFields
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`);
