'use client';

import { useEffect } from 'react';

/**
 * Suppresses hydration warnings caused by browser extensions
 * (like Bitdefender) that inject attributes like `bis_skin_checked`
 * into the DOM before React hydrates.
 * 
 * This only runs in development mode and doesn't affect production.
 */
export function SuppressHydrationWarning() {
  useEffect(() => {
    // Only suppress in development
    if (process.env.NODE_ENV !== 'development') return;

    const originalError = console.error;
    console.error = (...args) => {
      // Check if this is a hydration mismatch warning caused by browser extensions
      const message = args[0]?.toString() || '';
      if (
        message.includes('Hydration') &&
        (message.includes('bis_skin_checked') ||
          message.includes('browser extension') ||
          args.some((arg) => 
            typeof arg === 'string' && arg.includes('bis_skin_checked')
          ))
      ) {
        // Silently ignore this specific warning
        return;
      }
      originalError.apply(console, args);
    };

    return () => {
      console.error = originalError;
    };
  }, []);

  return null;
}
