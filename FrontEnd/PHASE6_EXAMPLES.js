/**
 * Phase 6 Caching - Usage Examples
 * Copy-paste ready code snippets
 */

// ============================================
// EXAMPLE 1: Using useApiCache for API Calls
// ============================================

import { useApiCache, CacheStrategy, StorageType } from '../hooks/useApiCache';

function PackageList() {
  const { data, loading, error, refetch, isStale } = useApiCache(
    'packages-list', // Unique cache key
    async () => {
      // Your API call
      const response = await fetch('/api/packages');
      return response.json();
    },
    {
      strategy: CacheStrategy.STALE_WHILE_REVALIDATE, // Best for UX
      ttl: 10 * 60 * 1000, // 10 minutes
      storage: StorageType.LOCAL, // Persists across sessions
      refetchOnWindowFocus: true, // Auto-refresh when tab focused
    }
  );

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      {isStale && <div>⚠️ Showing cached data, refreshing...</div>}
      {data.map(pkg => (
        <div key={pkg.id}>{pkg.name}</div>
      ))}
      <button onClick={refetch}>Force Refresh</button>
    </div>
  );
}

// ============================================
// EXAMPLE 2: Direct CacheManager Usage
// ============================================

import { cacheManager, StorageType } from '../utils/CacheManager';

// Store data
async function cacheUserPreferences(preferences) {
  await cacheManager.set('user-prefs', preferences, {
    ttl: 24 * 60 * 60 * 1000, // 24 hours
    storage: StorageType.LOCAL,
  });
}

// Retrieve data
async function getUserPreferences() {
  const prefs = await cacheManager.get('user-prefs', {
    storage: StorageType.LOCAL,
  });
  
  if (prefs === null) {
    // Not cached, load from API
    const response = await fetch('/api/preferences');
    const data = await response.json();
    await cacheUserPreferences(data);
    return data;
  }
  
  return prefs;
}

// Check cache statistics
function logCacheStats() {
  const stats = cacheManager.getStats();
  console.log(`Cache Hit Rate: ${stats.hitRate}`);
  console.log(`Hits: ${stats.hits}, Misses: ${stats.misses}`);
  console.log(`Memory Size: ${stats.memorySize} entries`);
  console.log(`LocalStorage: ${stats.localStorageSize}`);
}

// ============================================
// EXAMPLE 3: IndexedDB for Large Data
// ============================================

import { storeJSON, retrieveJSON, indexedDBManager } from '../utils/IndexedDBManager';

// Store large dataset
async function cacheAllPackages(packages) {
  await storeJSON('all-packages', packages, 60 * 60 * 1000); // 1 hour TTL
  console.log('✅ Cached', packages.length, 'packages');
}

// Retrieve large dataset
async function getAllPackages() {
  const cached = await retrieveJSON('all-packages');
  
  if (cached) {
    console.log('✅ Loaded from cache');
    return cached;
  }
  
  // Fetch from API
  const response = await fetch('/api/all-packages');
  const data = await response.json();
  await cacheAllPackages(data);
  return data;
}

// Get IndexedDB stats
async function logIndexedDBStats() {
  const stats = await indexedDBManager.getStats();
  console.log('IndexedDB Stats:', stats);
  // { totalEntries: 50, totalSize: "15.5 MB", expiredCount: 2 }
}

// Clean expired entries
async function cleanupCache() {
  const cleaned = await indexedDBManager.cleanExpired();
  console.log(`Cleaned ${cleaned} expired entries`);
}

// ============================================
// EXAMPLE 4: Cache Warming
// ============================================

import { 
  warmCacheAll, 
  prefetchPackage,
  refreshStaleCache 
} from '../utils/CacheWarming';

// Warm cache on app init (already done in App.jsx)
async function initApp() {
  await warmCacheAll(); // Preload critical data
  console.log('✅ Cache warmed');
}

// Prefetch specific package
async function onPackageLinkHover(packageId) {
  await prefetchPackage(packageId);
  console.log(`✅ Prefetched package ${packageId}`);
}

// Manual cache refresh
async function refreshData() {
  await refreshStaleCache();
  console.log('✅ Cache refreshed');
}

// ============================================
// EXAMPLE 5: Custom Cache Strategy
// ============================================

// Network-First (always try network, fallback to cache)
function RealtimeData() {
  const { data, loading } = useApiCache(
    'realtime-data',
    () => fetch('/api/realtime').then(r => r.json()),
    {
      strategy: CacheStrategy.NETWORK_FIRST, // Always try network first
      ttl: 1 * 60 * 1000, // 1 minute
    }
  );
  
  return <div>{data?.value}</div>;
}

// Cache-Only (never fetch from network)
function StaticData() {
  const { data } = useApiCache(
    'static-data',
    null, // No fetch function needed
    {
      strategy: CacheStrategy.CACHE_ONLY, // Only use cache
    }
  );
  
  return <div>{data?.content}</div>;
}

// ============================================
// EXAMPLE 6: Cache Invalidation
// ============================================

import { invalidateCacheKeys, clearAllCache } from '../hooks/useApiCache';

// Invalidate specific keys
async function onPackageUpdate(packageId) {
  await invalidateCacheKeys([
    `package_${packageId}`,
    'all_packages',
    'home_packages',
  ], { storage: StorageType.LOCAL });
  
  console.log('✅ Cache invalidated');
}

// Clear all cache (e.g., on logout)
async function onLogout() {
  await clearAllCache({ storage: StorageType.LOCAL });
  await clearAllCache({ storage: StorageType.MEMORY });
  console.log('✅ All cache cleared');
}

// ============================================
// EXAMPLE 7: Conditional Caching
// ============================================

function UserProfile({ userId }) {
  const { data, loading } = useApiCache(
    `user-${userId}`,
    () => fetch(`/api/users/${userId}`).then(r => r.json()),
    {
      enabled: userId !== null, // Only fetch if userId exists
      strategy: CacheStrategy.CACHE_FIRST,
      ttl: 5 * 60 * 1000,
    }
  );
  
  if (!userId) return <div>Please login</div>;
  if (loading) return <div>Loading...</div>;
  
  return <div>Welcome, {data?.name}!</div>;
}

// ============================================
// EXAMPLE 8: Cache with Loading States
// ============================================

function PackageDetails({ id }) {
  const { data, loading, error, isStale, refetch } = useApiCache(
    `package-${id}`,
    () => import(`../data/singlePackages.json`).then(m => 
      m.default.find(pkg => pkg.id === id)
    ),
    {
      strategy: CacheStrategy.STALE_WHILE_REVALIDATE,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  );

  return (
    <div>
      {/* Show stale indicator */}
      {isStale && (
        <div className="stale-warning">
          ⚠️ Showing cached data, fetching updates...
        </div>
      )}
      
      {/* Loading state */}
      {loading && <div className="spinner">Loading...</div>}
      
      {/* Error state */}
      {error && (
        <div className="error">
          Error: {error.message}
          <button onClick={refetch}>Retry</button>
        </div>
      )}
      
      {/* Data display */}
      {data && (
        <div>
          <h1>{data.name}</h1>
          <p>{data.description}</p>
          <button onClick={refetch}>Refresh</button>
        </div>
      )}
    </div>
  );
}

// ============================================
// EXAMPLE 9: Background Cache Refresh
// ============================================

import { useEffect } from 'react';

function App() {
  // Auto-refresh cache every 30 minutes
  useEffect(() => {
    const interval = setInterval(async () => {
      console.log('🔄 Background refresh triggered');
      await refreshStaleCache();
    }, 30 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return <div>App Content</div>;
}

// ============================================
// EXAMPLE 10: Cache Metrics Dashboard
// ============================================

function CacheMetrics() {
  const [stats, setStats] = useState(null);
  
  useEffect(() => {
    const updateStats = async () => {
      const cacheStats = cacheManager.getStats();
      const dbStats = await indexedDBManager.getStats();
      setStats({ cache: cacheStats, db: dbStats });
    };
    
    updateStats();
    const interval = setInterval(updateStats, 5000);
    return () => clearInterval(interval);
  }, []);
  
  if (!stats) return null;
  
  return (
    <div className="metrics">
      <h2>Cache Performance</h2>
      <div>Hit Rate: {stats.cache.hitRate}</div>
      <div>Requests: {stats.cache.hits + stats.cache.misses}</div>
      <div>Memory: {stats.cache.memorySize} entries</div>
      <div>LocalStorage: {stats.cache.localStorageSize}</div>
      <div>IndexedDB: {stats.db.totalSize}</div>
    </div>
  );
}

// ============================================
// EXAMPLE 11: Prefetch on Route Change
// ============================================

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function RouteHandler() {
  const location = useLocation();
  
  useEffect(() => {
    // Prefetch related data when route changes
    if (location.pathname.startsWith('/package/')) {
      const packageId = location.pathname.split('/')[2];
      prefetchPackage(packageId);
    }
  }, [location]);
  
  return null;
}

// ============================================
// EXAMPLE 12: Cache with Optimistic Updates
// ============================================

function PackageRating({ packageId }) {
  const { data, refetch } = useApiCache(
    `package-rating-${packageId}`,
    () => fetch(`/api/packages/${packageId}/rating`).then(r => r.json()),
  );
  
  const handleRate = async (newRating) => {
    // Optimistically update cache
    await cacheManager.set(`package-rating-${packageId}`, {
      ...data,
      rating: newRating,
    }, { storage: StorageType.MEMORY });
    
    try {
      // Send to API
      await fetch(`/api/packages/${packageId}/rate`, {
        method: 'POST',
        body: JSON.stringify({ rating: newRating }),
      });
      
      // Refetch to get server truth
      await refetch();
    } catch (error) {
      // Revert on error
      await refetch();
      alert('Rating failed');
    }
  };
  
  return (
    <div>
      Current Rating: {data?.rating}
      <button onClick={() => handleRate(5)}>Rate 5 Stars</button>
    </div>
  );
}

export {
  // Add your exports here
};
