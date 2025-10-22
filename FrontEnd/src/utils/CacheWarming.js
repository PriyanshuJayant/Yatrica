/**
 * Cache Warming Strategy
 * Preloads critical data on app initialization to improve perceived performance
 */

import { cacheManager, StorageType } from './CacheManager';

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const STORAGE = StorageType.LOCAL;

/**
 * Critical data to preload
 */
const CRITICAL_DATA_KEYS = {
  HOME_FAMILY: 'home_family_packages',
  HOME_CORPORATE: 'home_corporate_packages',
  HOME_HONEYMOON: 'home_honeymoon_packages',
  HOME_BUDGET: 'home_budget_packages',
  ALL_PACKAGES: 'all_packages',
};

/**
 * Preload strategy configuration
 */
const PRELOAD_CONFIG = {
  // Load immediately on app start
  immediate: [
    CRITICAL_DATA_KEYS.HOME_FAMILY,
    CRITICAL_DATA_KEYS.HOME_CORPORATE,
    CRITICAL_DATA_KEYS.HOME_HONEYMOON,
    CRITICAL_DATA_KEYS.HOME_BUDGET,
  ],
  
  // Load after initial render (low priority)
  deferred: [
    CRITICAL_DATA_KEYS.ALL_PACKAGES,
  ],
};

/**
 * Data loaders for each key
 */
const DATA_LOADERS = {
  [CRITICAL_DATA_KEYS.HOME_FAMILY]: () => import('../assets/data/familyPackage.json').then(m => m.default),
  [CRITICAL_DATA_KEYS.HOME_CORPORATE]: () => import('../assets/data/corporate.json').then(m => m.default),
  [CRITICAL_DATA_KEYS.HOME_HONEYMOON]: () => import('../assets/data/honeyMoon.json').then(m => m.default),
  [CRITICAL_DATA_KEYS.HOME_BUDGET]: () => import('../assets/data/budgetFriendly.json').then(m => m.default),
  [CRITICAL_DATA_KEYS.ALL_PACKAGES]: () => import('../assets/Packages/AllPackages.json').then(m => m.default),
};

/**
 * Preload a single data key
 */
async function preloadData(key) {
  try {
    // Check if already cached
    const cached = await cacheManager.get(`data_${key}`, { storage: STORAGE });
    if (cached !== null) {
      return cached;
    }

    // Load and cache data
    const loader = DATA_LOADERS[key];
    if (!loader) {
      return null;
    }

    const data = await loader();
    await cacheManager.set(`data_${key}`, data, {
      ttl: CACHE_TTL,
      storage: STORAGE,
    });

    return data;
  } catch (error) {
    return null;
  }
}

/**
 * Warm cache with immediate data
 */
export async function warmCacheImmediate() {
  const promises = PRELOAD_CONFIG.immediate.map(key => preloadData(key));
  
  try {
    await Promise.allSettled(promises);
  } catch (error) {
    // Silent error handling
  }
}

/**
 * Warm cache with deferred data (low priority)
 */
export async function warmCacheDeferred() {
  // Wait for idle time
  if ('requestIdleCallback' in window) {
    requestIdleCallback(async () => {
      const promises = PRELOAD_CONFIG.deferred.map(key => preloadData(key));
      await Promise.allSettled(promises);
    }, { timeout: 5000 });
  } else {
    // Fallback: use setTimeout
    setTimeout(async () => {
      const promises = PRELOAD_CONFIG.deferred.map(key => preloadData(key));
      await Promise.allSettled(promises);
    }, 2000);
  }
}

/**
 * Warm cache with all data
 */
export async function warmCacheAll() {
  await warmCacheImmediate();
  await warmCacheDeferred();
}

/**
 * Prefetch specific package data
 */
export async function prefetchPackage(packageId) {
  const key = `package_${packageId}`;
  
  try {
    const cached = await cacheManager.get(`data_${key}`, { storage: STORAGE });
    if (cached !== null) return cached;

    // Load package data
    const singlePackages = await import('../assets/singlePackages.json').then(m => m.default);
    const packageData = singlePackages.find(pkg => pkg.id === packageId);
    
    if (packageData) {
      await cacheManager.set(`data_${key}`, packageData, {
        ttl: CACHE_TTL,
        storage: STORAGE,
      });
    }

    return packageData;
  } catch (error) {
    return null;
  }
}

/**
 * Prefetch packages on hover (link prefetching)
 */
export function setupLinkPrefetch() {
  // Prefetch on mouse enter (300ms before click)
  const handleMouseEnter = (e) => {
    // Check if e.target has closest method (some elements might not)
    if (!e.target || typeof e.target.closest !== 'function') return;
    
    const link = e.target.closest('a[href^="/package/"]');
    if (!link) return;

    const href = link.getAttribute('href');
    if (!href) return;
    
    const match = href.match(/\/package\/(\d+)/);
    if (match) {
      const packageId = match[1];
      prefetchPackage(packageId);
    }
  };

  document.addEventListener('mouseenter', handleMouseEnter, true);
  
  return () => {
    document.removeEventListener('mouseenter', handleMouseEnter, true);
  };
}

/**
 * Refresh stale cache in background
 */
export async function refreshStaleCache() {
  const allKeys = Object.values(CRITICAL_DATA_KEYS);
  
  for (const key of allKeys) {
    try {
      // Force refresh by deleting and reloading
      await cacheManager.delete(`data_${key}`, { storage: STORAGE });
      await preloadData(key);
    } catch (error) {
      // Silent error handling
    }
  }
}

/**
 * Schedule periodic cache refresh (every 30 minutes)
 */
export function schedulePeriodicCacheRefresh() {
  const REFRESH_INTERVAL = 30 * 60 * 1000; // 30 minutes
  
  const intervalId = setInterval(() => {
    refreshStaleCache();
  }, REFRESH_INTERVAL);
  
  // Cleanup function
  return () => clearInterval(intervalId);
}

/**
 * Initialize cache warming on app start
 */
export function initializeCacheWarming() {
  // Warm cache immediately
  warmCacheImmediate();
  
  // Warm deferred data
  warmCacheDeferred();
  
  // Setup link prefetching
  const cleanupPrefetch = setupLinkPrefetch();
  
  // Schedule periodic refresh
  const cleanupRefresh = schedulePeriodicCacheRefresh();
  
  // Return cleanup function
  return () => {
    cleanupPrefetch();
    cleanupRefresh();
  };
}

export default initializeCacheWarming;
