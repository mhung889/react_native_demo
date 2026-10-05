// Source - https://stackoverflow.com/a/79876880
// Posted by qix
// Retrieved 2026-10-05, License - CC BY-SA 4.0

import { useRef, useCallback, useEffect } from 'react';

export function useDebounceFn<T extends (...args: any[]) => any>(
  fn: T,
  delayMs: number,
) {
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  // Prevent stale closures without recreating the trigger by using the
  // latest ref pattern.
  const fnRef = useRef(fn);
  useEffect(() => {
    fnRef.current = fn;
  }, [fn]);

  // Stable helper to clear the timeout for internal and caller use.
  const clearPendingDebouncedFn = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  // Trigger adapts to changes in the delay and the function ref.
  const debouncedFn = useCallback(
    (...args: Parameters<T>) => {
      clearPendingDebouncedFn();

      timeoutRef.current = setTimeout(() => {
        fnRef.current(...args);
      }, delayMs);
    },
    [delayMs, clearPendingDebouncedFn],
  );

  // Cleanup stale calls on unmount AND if delayMs changes
  useEffect(() => {
    return () => clearPendingDebouncedFn();
  }, [delayMs, clearPendingDebouncedFn]);

  return [debouncedFn, clearPendingDebouncedFn] as const;
}
