import { graphql } from '../graphql';

export const likeImageMutation = graphql(`
  mutation LikeImage($imageId: ID!) {
    likeImage(input: { imageId: $imageId }) {
      image {
        id
        title
        picture
      }
    }
  }
`);
