import { graphql } from '@/graphql';

export const imageFieldsFragment = graphql(`
  fragment ImageFields on Image {
    id
    title
    picture
    author
    likesCount
    liked
    createdAt
    updatedAt
  }
`);
