import React, { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useKeepAlive } from '../context/KeepAliveContext';

/**
 * KeepAlive Component - Caches rendered components permanently
 * Components are never unmounted once loaded, only hidden/shown
 */
export function KeepAlive({ children, cacheKey }) {
  const location = useLocation();
  const { getCached, setCache, isCached } = useKeepAlive();
  const containerRef = useRef(null);
  
  // Use location.pathname as default cache key
  const key = cacheKey || location.pathname;
  const isCurrentRoute = location.pathname === key;

  useEffect(() => {
    // Store component in cache if not already cached
    if (!isCached(key) && containerRef.current) {
      setCache(key, {
        element: children,
        timestamp: Date.now(),
      });
    }
  }, [key, children, isCached, setCache]);

  // Get cached version if available
  const cached = getCached(key);
  const shouldShow = isCurrentRoute;

  return (
    <div
      ref={containerRef}
      style={{
        display: shouldShow ? 'block' : 'none',
        width: '100%',
        height: '100%',
      }}
    >
      {cached ? cached.element : children}
    </div>
  );
}

/**
 * KeepAliveRoute - Wrapper for route-level caching
 * Automatically uses pathname as cache key
 */
export function KeepAliveRoute({ component: Component, ...props }) {
  const location = useLocation();
  
  return (
    <KeepAlive cacheKey={location.pathname}>
      <Component {...props} />
    </KeepAlive>
  );
}
