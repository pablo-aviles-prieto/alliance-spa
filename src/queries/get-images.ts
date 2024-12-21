import { graphql } from '../graphql';

export const getImagesQuery = graphql(`
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
