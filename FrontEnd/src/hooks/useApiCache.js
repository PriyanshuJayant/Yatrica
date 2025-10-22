import { useState, useEffect, useCallback, useRef } from 'react';
import { cacheManager, CacheStrategy, StorageType } from '../utils/CacheManager';

/**
 * useApiCache Hook
 * Provides automatic caching for API calls with configurable strategies
 * 
 * @param {string} key - Cache key
 * @param {Function} fetchFn - Function that returns a Promise (API call)
 * @param {Object} options - Configuration options
 * @returns {Object} - { data, loading, error, refetch, invalidate }
 */
export function useApiCache(key, fetchFn, options = {}) {
  const {
    strategy = CacheStrategy.CACHE_FIRST,
    ttl = 5 * 60 * 1000, // 5 minutes
    storage = StorageType.LOCAL,
    enabled = true,
    refetchOnMount = false,
    refetchOnWindowFocus = false,
    staleTime = 0, // How long data is considered fresh (0 = always stale)
  } = options;

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isStale, setIsStale] = useState(false);

  const isMountedRef = useRef(true);
  const lastFetchTime = useRef(0);
  const backgroundFetchRef = useRef(null);

  /**
   * Fetch from network
   */
  const fetchFromNetwork = useCallback(async () => {
    try {
      const result = await fetchFn();
      
      if (!isMountedRef.current) return null;

      // Cache the result
      await cacheManager.set(key, result, { ttl, storage });
      lastFetchTime.current = Date.now();
      
      return result;
    } catch (err) {
      if (!isMountedRef.current) return null;
      throw err;
    }
  }, [key, fetchFn, ttl, storage]);

  /**
   * Fetch from cache
   */
  const fetchFromCache = useCallback(async () => {
    return await cacheManager.get(key, { storage });
  }, [key, storage]);

  /**
   * Execute fetch based on strategy
   */
  const executeFetch = useCallback(async (isBackgroundFetch = false) => {
    if (!isBackgroundFetch) {
      setLoading(true);
      setError(null);
    }

    try {
      let result = null;

      switch (strategy) {
        case CacheStrategy.CACHE_FIRST: {
          // Try cache first, fallback to network
          result = await fetchFromCache();
          if (result === null) {
            result = await fetchFromNetwork();
          }
          break;
        }

        case CacheStrategy.NETWORK_FIRST: {
          // Try network first, fallback to cache
          try {
            result = await fetchFromNetwork();
          } catch (networkError) {
            result = await fetchFromCache();
            if (result === null) {
              throw networkError;
            }
          }
          break;
        }

        case CacheStrategy.CACHE_ONLY: {
          // Only use cache
          result = await fetchFromCache();
          break;
        }

        case CacheStrategy.NETWORK_ONLY: {
          // Only use network
          result = await fetchFromNetwork();
          break;
        }

        case CacheStrategy.STALE_WHILE_REVALIDATE: {
          // Return cache immediately, fetch in background
          result = await fetchFromCache();
          
          if (result !== null) {
            // Return stale data immediately
            if (!isBackgroundFetch) {
              setData(result);
              setLoading(false);
              setIsStale(true);
            }
          }

          // Fetch fresh data in background
          if (!backgroundFetchRef.current) {
            backgroundFetchRef.current = fetchFromNetwork()
              .then(freshData => {
                if (isMountedRef.current) {
                  setData(freshData);
                  setIsStale(false);
                }
                backgroundFetchRef.current = null;
              })
              .catch(err => {
                console.warn('Background fetch failed:', err);
                backgroundFetchRef.current = null;
              });
          }

          // If no cache, wait for network
          if (result === null) {
            result = await backgroundFetchRef.current;
          }
          break;
        }

        default:
          result = await fetchFromCache() || await fetchFromNetwork();
      }

      if (!isMountedRef.current) return;

      setData(result);
      setError(null);
    } catch (err) {
      if (!isMountedRef.current) return;
      
      setError(err);
      console.error(`Failed to fetch data for key: ${key}`, err);
    } finally {
      if (!isMountedRef.current) return;
      
      if (!isBackgroundFetch) {
        setLoading(false);
      }
    }
  }, [strategy, fetchFromCache, fetchFromNetwork, key]);

  /**
   * Refetch data (force refresh)
   */
  const refetch = useCallback(async () => {
    await cacheManager.delete(key, { storage });
    await executeFetch();
  }, [key, storage, executeFetch]);

  /**
   * Invalidate cache without refetching
   */
  const invalidate = useCallback(async () => {
    await cacheManager.delete(key, { storage });
    setIsStale(true);
  }, [key, storage]);

  /**
   * Check if data is stale
   */
  const checkStale = useCallback(() => {
    if (staleTime === 0) return true;
    return Date.now() - lastFetchTime.current > staleTime;
  }, [staleTime]);

  /**
   * Initial fetch on mount
   */
  useEffect(() => {
    if (!enabled) {
      setLoading(false);
      return;
    }

    executeFetch();

    return () => {
      isMountedRef.current = false;
    };
  }, [enabled, executeFetch]);

  /**
   * Refetch on mount if requested
   */
  useEffect(() => {
    if (refetchOnMount && enabled && data !== null) {
      if (checkStale()) {
        executeFetch(true); // Background fetch
      }
    }
  }, [refetchOnMount, enabled, data, executeFetch, checkStale]);

  /**
   * Refetch on window focus
   */
  useEffect(() => {
    if (!refetchOnWindowFocus || !enabled) return;

    const handleFocus = () => {
      if (checkStale()) {
        executeFetch(true); // Background fetch
      }
    };

    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [refetchOnWindowFocus, enabled, executeFetch, checkStale]);

  return {
    data,
    loading,
    error,
    isStale,
    refetch,
    invalidate,
  };
}

/**
 * Preload data into cache
 */
export async function preloadCache(key, fetchFn, options = {}) {
  const {
    ttl = 5 * 60 * 1000,
    storage = StorageType.LOCAL,
  } = options;

  try {
    // Check if already cached
    const cached = await cacheManager.get(key, { storage });
    if (cached !== null) return cached;

    // Fetch and cache
    const data = await fetchFn();
    await cacheManager.set(key, data, { ttl, storage });
    return data;
  } catch (error) {
    console.warn(`Failed to preload cache for key: ${key}`, error);
    return null;
  }
}

/**
 * Invalidate multiple cache keys
 */
export async function invalidateCacheKeys(keys, options = {}) {
  const { storage = StorageType.LOCAL } = options;
  
  const promises = keys.map(key => 
    cacheManager.delete(key, { storage })
  );
  
  await Promise.all(promises);
}

/**
 * Clear all cache
 */
export async function clearAllCache(options = {}) {
  await cacheManager.clear(options);
}

export default useApiCache;
