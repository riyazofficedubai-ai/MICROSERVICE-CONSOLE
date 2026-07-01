'use client';

import { useState, useEffect, useCallback } from 'react';

/**
 * Generic localStorage-backed state hook.
 * Used to simulate persistence for signed-up users on the client
 * (separate from the live Product/Order data which comes from the NestJS services).
 */
export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(initialValue);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) setStoredValue(JSON.parse(item));
    } catch (err) {
      console.warn(`Could not read localStorage key "${key}":`, err);
    } finally {
      setHydrated(true);
    }
  }, [key]);

  const setValue = useCallback(
    (value: T | ((prev: T) => T)) => {
      setStoredValue((prev) => {
        const next = value instanceof Function ? value(prev) : value;
        try {
          window.localStorage.setItem(key, JSON.stringify(next));
        } catch (err) {
          console.warn(`Could not write localStorage key "${key}":`, err);
        }
        return next;
      });
    },
    [key],
  );

  return { value: storedValue, setValue, hydrated };
}
