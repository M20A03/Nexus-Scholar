import { useSearchParams } from 'react-router-dom';
import { useCallback } from 'react';

/**
 * Hook for bidirectional synchronization of UI state with URL query parameters.
 * Enables shareable URLs, bookmarking, and refresh persistence.
 */
export function useUrlState<T extends string>(
  key: string,
  defaultValue: T
): [T, (newValue: T | ((prev: T) => T)) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  const value = (searchParams.get(key) as T) || defaultValue;

  const setValue = useCallback(
    (newValue: T | ((prev: T) => T)) => {
      setSearchParams(
        (prev) => {
          const nextVal = typeof newValue === 'function' ? (newValue as any)(prev.get(key) || defaultValue) : newValue;
          const updated = new URLSearchParams(prev);
          if (nextVal === defaultValue || nextVal === '' || nextVal === undefined) {
            updated.delete(key);
          } else {
            updated.set(key, nextVal);
          }
          return updated;
        },
        { replace: true }
      );
    },
    [key, defaultValue, setSearchParams]
  );

  return [value, setValue];
}
