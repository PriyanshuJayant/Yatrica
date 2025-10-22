import React, { createContext, useContext, useRef, useCallback } from 'react';

/**
 * DataCacheContext - Centralized cache for JSON data
 * Prevents redundant fetching and reduces bundle size by lazy loading JSON
 */
const DataCacheContext = createContext(null);

export function DataCacheProvider({ children }) {
  const cacheRef = useRef(new Map());

  const getData = useCallback(async (key, loader) => {
    // Check if data is already cached
    if (cacheRef.current.has(key)) {
      return cacheRef.current.get(key);
    }

    // Load data using the provided loader function
    try {
      const data = await loader();
      cacheRef.current.set(key, data);
      return data;
    } catch (error) {
      console.error(`Failed to load data for key: ${key}`, error);
      throw error;
    }
  }, []);

  const setData = useCallback((key, data) => {
    cacheRef.current.set(key, data);
  }, []);

  const hasData = useCallback((key) => {
    return cacheRef.current.has(key);
  }, []);

  const clearData = useCallback((key) => {
    if (key) {
      cacheRef.current.delete(key);
    } else {
      cacheRef.current.clear();
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
