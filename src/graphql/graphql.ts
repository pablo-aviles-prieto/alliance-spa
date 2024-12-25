/* eslint-disable */
import { DocumentTypeDecoration } from '@graphql-typed-document-node/core';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never;
};
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: { input: any; output: any };
};

export type Image = {
  __typename?: 'Image';
  author?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
  id: Scalars['ID']['output'];
  liked?: Maybe<Scalars['Boolean']['output']>;
  likesCount?: Maybe<Scalars['Int']['output']>;
  picture?: Maybe<Scalars['String']['output']>;
  price?: Maybe<Scalars['Int']['output']>;
  title?: Maybe<Scalars['String']['output']>;
  updatedAt?: Maybe<Scalars['ISO8601DateTime']['output']>;
};

/** The connection type for Image. */
export type ImageConnection = {
  __typename?: 'ImageConnection';
  /** A list of edges. */
  edges?: Maybe<Array<Maybe<ImageEdge>>>;
  /** A list of nodes. */
  nodes?: Maybe<Array<Maybe<Image>>>;
  /** Information to aid in pagination. */
  pageInfo: PageInfo;
};

/** An edge in a connection. */
export type ImageEdge = {
  __typename?: 'ImageEdge';
  /** A cursor for use in pagination. */
  cursor: Scalars['String']['output'];
  /** The item at the end of the edge. */
  node?: Maybe<Image>;
};

/** Autogenerated input type of LikeImage */
export type LikeImageInput = {
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: InputMaybe<Scalars['String']['input']>;
  imageId: Scalars['ID']['input'];
};

/** Autogenerated return type of LikeImage. */
export type LikeImagePayload = {
  __typename?: 'LikeImagePayload';
  /** A unique identifier for the client performing the mutation. */
  clientMutationId?: Maybe<Scalars['String']['output']>;
  image: Image;
};

export type Mutation = {
  __typename?: 'Mutation';
  likeImage?: Maybe<LikeImagePayload>;
};

export type MutationLikeImageArgs = {
  input: LikeImageInput;
};

/** Information about pagination in a connection. */
export type PageInfo = {
  __typename?: 'PageInfo';
  /** When paginating forwards, the cursor to continue. */
  endCursor?: Maybe<Scalars['String']['output']>;
  /** When paginating forwards, are there more items? */
  hasNextPage: Scalars['Boolean']['output'];
  /** When paginating backwards, are there more items? */
  hasPreviousPage: Scalars['Boolean']['output'];
  /** When paginating backwards, the cursor to continue. */
  startCursor?: Maybe<Scalars['String']['output']>;
};

export type Query = {
  __typename?: 'Query';
  images: ImageConnection;
};

export type QueryImagesArgs = {
  after?: InputMaybe<Scalars['String']['input']>;
  before?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  last?: InputMaybe<Scalars['Int']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
};

export type GetImagesQueryVariables = Exact<{
  after?: InputMaybe<Scalars['String']['input']>;
  title?: InputMaybe<Scalars['String']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
}>;

export type GetImagesQuery = {
  __typename?: 'Query';
  images: {
    __typename?: 'ImageConnection';
    nodes?: Array<{
      __typename?: 'Image';
      id: string;
      title?: string | null;
      picture?: string | null;
      author?: string | null;
      likesCount?: number | null;
      liked?: boolean | null;
      createdAt?: any | null;
      updatedAt?: any | null;
    } | null> | null;
    pageInfo: { __typename?: 'PageInfo'; hasNextPage: boolean; endCursor?: string | null };
  };
};

export class TypedDocumentString<TResult, TVariables>
  extends String
  implements DocumentTypeDecoration<TResult, TVariables>
{
  __apiType?: DocumentTypeDecoration<TResult, TVariables>['__apiType'];

  constructor(
    private value: string,
    public __meta__?: Record<string, any> | undefined
  ) {
    super(value);
  }

  toString(): string & DocumentTypeDecoration<TResult, TVariables> {
    return this.value;
  }
}

export const GetImagesDocument = new TypedDocumentString(`
    query GetImages($after: String, $title: String, $first: Int = 20) {
  images(first: $first, after: $after, title: $title) {
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
    `) as unknown as TypedDocumentString<GetImagesQuery, GetImagesQueryVariables>;
