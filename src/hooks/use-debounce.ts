import { useRef } from 'react';

export const useDebounce = <T extends (...args: Parameters<T>) => void>(
  callback: T,
  delay: number = 300
) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const debouncedFunction = (...args: Parameters<T>) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      callback(...args);
    }, delay);
  };

  return debouncedFunction;
};
