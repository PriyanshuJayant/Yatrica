import React, { createContext, useContext, useRef, useCallback, useEffect } from 'react';
import { cacheManager, StorageType } from '../utils/CacheManager';

/**
 * DataCacheContext - Centralized cache for JSON data with persistent storage
 * Prevents redundant fetching and reduces bundle size by lazy loading JSON
 */
const DataCacheContext = createContext(null);

const CACHE_TTL = 30 * 60 * 1000; // 30 minutes
const STORAGE = StorageType.LOCAL; // Persistent across sessions

export function DataCacheProvider({ children }) {
  const cacheRef = useRef(new Map());
  const isInitialized = useRef(false);

  // Initialize cache from persistent storage on mount
  useEffect(() => {
    if (isInitialized.current) return;
    isInitialized.current = true;

    // Clean expired entries on startup
    const cleanCache = async () => {
      try {
        // This will be handled by CacheManager's TTL checks
        // console.log('✅ Cache initialized with persistent storage');
      } catch (error) {
        console.warn('Failed to initialize cache:', error);
      }
    };

    cleanCache();
  }, []);

  const getData = useCallback(async (key, loader) => {
    // Check memory cache first (fastest)
    if (cacheRef.current.has(key)) {
      return cacheRef.current.get(key);
    }

    // Check persistent storage (LocalStorage/IndexedDB)
    const cachedData = await cacheManager.get(`data_${key}`, { storage: STORAGE });
    if (cachedData !== null) {
      cacheRef.current.set(key, cachedData);
      return cachedData;
    }

    // Load data using the provided loader function
    try {
      const data = await loader();
      
      // Store in both memory and persistent cache
      cacheRef.current.set(key, data);
      await cacheManager.set(`data_${key}`, data, { 
        ttl: CACHE_TTL, 
        storage: STORAGE 
      });
      
      return data;
    } catch (error) {
      console.error(`Failed to load data for key: ${key}`, error);
      throw error;
    }
  }, []);

  const setData = useCallback(async (key, data) => {
    cacheRef.current.set(key, data);
    await cacheManager.set(`data_${key}`, data, { 
      ttl: CACHE_TTL, 
      storage: STORAGE 
    });
  }, []);

  const hasData = useCallback((key) => {
    return cacheRef.current.has(key);
  }, []);

  const clearData = useCallback(async (key) => {
    if (key) {
      cacheRef.current.delete(key);
      await cacheManager.delete(`data_${key}`, { storage: STORAGE });
    } else {
      cacheRef.current.clear();
      await cacheManager.clear({ storage: STORAGE });
    }
  }, []);

  const getCachedKeys = useCallback(() => {
    return Array.from(cacheRef.current.keys());
  }, []);

  const value = {
    getData,
    setData,
    hasData,
    clearData,
    getCachedKeys,
  };

  return (
    <DataCacheContext.Provider value={value}>
      {children}
    </DataCacheContext.Provider>
  );
}

export function useDataCache() {
  const context = useContext(DataCacheContext);
  if (!context) {
    throw new Error('useDataCache must be used within DataCacheProvider');
  }
  return context;
}

/**
 * usePackageData - Hook to load and cache package data
 * @param {string} category - Package category (family, corporate, honeymoon, budget, all)
 * @returns {object} - { data, loading, error }
 */
export function usePackageData(category) {
  const { getData } = useDataCache();
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const data = await getData(`packages-${category}`, async () => {
          // Dynamic import based on category
          switch (category) {
            case 'family':
              return (await import('../assets/Packages/FamilyPackages.json')).default;
            case 'corporate':
              return (await import('../assets/Packages/CorporatePackages.json')).default;
            case 'honeymoon':
              return (await import('../assets/Packages/HoneyMoonPackages.json')).default;
            case 'budget':
              return (await import('../assets/Packages/BudgetPackages.json')).default;
            case 'all':
              return (await import('../assets/Packages/AllPackages.json')).default;
            default:
              throw new Error(`Unknown category: ${category}`);
          }
        });

        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, loading: false, error: error.message });
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [category, getData]);

  return state;
}

/**
 * useHomePackageData - Hook to load multiple package categories for home page
 */
export function useHomePackageData(categories = ['family', 'corporate', 'honeymoon', 'budget']) {
  const { getData } = useDataCache();
  const [state, setState] = React.useState({
    data: {},
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const results = await Promise.all(
          categories.map(async (category) => {
            const data = await getData(`packages-${category}`, async () => {
              switch (category) {
                case 'family':
                  return (await import('../assets/data/familyPackage.json')).default;
                case 'corporate':
                  return (await import('../assets/data/corporate.json')).default;
                case 'honeymoon':
                  return (await import('../assets/data/honeyMoon.json')).default;
                case 'budget':
                  return (await import('../assets/data/budgetFriendly.json')).default;
                default:
                  return [];
              }
            });
            return { category, data };
          })
        );

        if (isMounted) {
          const dataMap = results.reduce((acc, { category, data }) => {
            acc[category] = data;
            return acc;
          }, {});
          setState({ data: dataMap, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: {}, loading: false, error: error.message });
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [categories.join(','), getData]);

  return state;
}

/**
 * useSinglePackageData - Hook to load single package details
 */
export function useSinglePackageData(packageId) {
  const { getData } = useDataCache();
  const [state, setState] = React.useState({
    data: null,
    loading: true,
    error: null,
  });

  React.useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        setState(prev => ({ ...prev, loading: true, error: null }));

        const allPackages = await getData('single-packages', async () => {
          return (await import('../assets/singlePackages.json')).default;
        });

        const packageData = allPackages.find(pkg => pkg.id === packageId);

        if (isMounted) {
          setState({ 
            data: packageData || null, 
            loading: false, 
            error: packageData ? null : 'Package not found' 
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, loading: false, error: error.message });
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [packageId, getData]);

  return state;
}

export default DataCacheContext;
