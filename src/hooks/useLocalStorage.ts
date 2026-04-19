"use client";

import { useState, useEffect, useCallback } from "react";

/**
 * Generic localStorage hook with SSR safety.
 * Falls back to `initialValue` if window is not available.
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  // Read from localStorage on mount (client only)
  const [stored, setStored] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStored(JSON.parse(item));
    } catch {
      // localStorage unavailable or corrupted — use initial
    }
    setHydrated(true);
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStored((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch {
          // quota exceeded, private mode, etc.
        }
        return next;
      });
    },
    [key]
  );

  // Return initial value during SSR to avoid hydration mismatch
  return [hydrated ? stored : initialValue, setValue];
}
