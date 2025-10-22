import { useEffect } from 'react';
import { useKeepAlive } from '../context/KeepAliveContext';

/**
 * RouteCacheManager - Development tool to monitor cached routes
 * Shows which routes are cached in console
 */
export function RouteCacheManager() {
  const { getCachedKeys } = useKeepAlive();

  useEffect(() => {
    const logCachedRoutes = () => {
      const cached = getCachedKeys();
      if (cached.length > 0) {
        console.log('🚀 Cached Routes:', cached);
        console.log(`📊 Total cached: ${cached.length} routes`);
      }
    };

    // Log on mount and when cache changes
    logCachedRoutes();

    // Optional: Add to window for debugging
    if (typeof window !== 'undefined') {
      window.__ROUTE_CACHE__ = {
        getCached: getCachedKeys,
        count: () => getCachedKeys().length,
      };
    }

    return () => {
      if (typeof window !== 'undefined') {
        delete window.__ROUTE_CACHE__;
      }
    };
  }, [getCachedKeys]);

  return null; // This component doesn't render anything
}

/**
 * Hook to manually clear cache if needed
 */
export function useClearCache() {
  const { clearCache } = useKeepAlive();
  return clearCache;
}
