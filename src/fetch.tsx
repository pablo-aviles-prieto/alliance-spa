import { useQuery, gql } from '@apollo/client';
import { useEffect, useState } from 'react';

const GET_IMAGES = gql`
  query GetImages($after: String) {
    images(first: 23, after: $after) {
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
`;

export const FetchData = () => {
  const { data, loading, error, fetchMore } = useQuery(GET_IMAGES);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [images, setImages] = useState<any[]>([]);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);
  const [nextCursor, setNextCursor] = useState<string>('');

  useEffect(() => {
    if (data?.images?.nodes) {
      setImages(prev => [...prev, ...data.images.nodes]);
      setHasNextPage(data.images.pageInfo.hasNextPage);
      setNextCursor(data.images.pageInfo.endCursor);
    }
  }, [data]);

  const loadMore = async () => {
    if (hasNextPage) {
      const res = await fetchMore({
        variables: { after: nextCursor },
      });
      if (res?.data?.images?.nodes) {
        setImages(prev => [...prev, ...res.data.images.nodes]);
        setHasNextPage(res.data.images.pageInfo.hasNextPage);
        setNextCursor(res.data.images.pageInfo.endCursor);
      }
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      {images.map(img => (
        <div key={img.id}>
          <h3>{img.title}</h3>
          {/* <img src={img.picture} alt={img.title} /> */}
        </div>
      ))}
      {hasNextPage && <button onClick={loadMore}>Load More</button>}
    </div>
  );
};
