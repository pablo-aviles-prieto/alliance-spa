import { useEffect } from 'react';

type IntersectionCallback = (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;

function useIntersection(
  targetRef: React.RefObject<HTMLElement>,
  callback: IntersectionCallback,
  options: IntersectionObserverInit = { threshold: 0.1 }
) {
  useEffect(() => {
    if (!targetRef.current) return;

    const observer = new IntersectionObserver(([entry]) => {
      callback(entry.isIntersecting, entry);
    }, options);

    observer.observe(targetRef.current);

    return () => {
      observer.disconnect();
    };
  }, [targetRef, callback, options]);
}

export default useIntersection;
