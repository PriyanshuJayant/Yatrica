import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

const KeepAliveContext = createContext(null);

export function KeepAliveProvider({ children }) {
  // Cache to store component instances
  const cacheRef = useRef(new Map());
  const [, forceUpdate] = useState({});

  // Get cached component or create new entry
  const getCached = useCallback((cacheKey) => {
    return cacheRef.current.get(cacheKey);
  }, []);

  // Store component in cache
  const setCache = useCallback((cacheKey, component) => {
    cacheRef.current.set(cacheKey, component);
    forceUpdate({});
  }, []);

  // Check if component is cached
  const isCached = useCallback((cacheKey) => {
    return cacheRef.current.has(cacheKey);
  }, []);

  // Clear specific cache (optional - for memory management)
  const clearCache = useCallback((cacheKey) => {
    if (cacheKey) {
      cacheRef.current.delete(cacheKey);
    } else {
      cacheRef.current.clear();
    }
    forceUpdate({});
  }, []);

  // Get all cached keys
  const getCachedKeys = useCallback(() => {
    return Array.from(cacheRef.current.keys());
  }, []);

  const value = {
    getCached,
    setCache,
    isCached,
    clearCache,
    getCachedKeys,
  };

  return (
    <KeepAliveContext.Provider value={value}>
      {children}
    </KeepAliveContext.Provider>
  );
}

export function useKeepAlive() {
  const context = useContext(KeepAliveContext);
  if (!context) {
    throw new Error('useKeepAlive must be used within KeepAliveProvider');
  }
  return context;
}
