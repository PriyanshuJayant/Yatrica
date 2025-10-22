import React, { useState, useEffect, useRef } from 'react';

/**
 * LazySection - Lazy loads components when they approach viewport
 * Once loaded, components stay in DOM permanently (never unmount)
 * 
 * @param {React.ReactNode} children - Component to lazy load
 * @param {React.ReactNode} fallback - Loading placeholder
 * @param {string} rootMargin - How early to start loading (default: "200px")
 * @param {number} threshold - Intersection threshold (default: 0.01)
 */
export function LazySection({ 
  children, 
  fallback = null, 
  rootMargin = "200px",
  threshold = 0.01,
  minHeight = "100px",
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // If already loaded, don't observe again
    if (isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isLoaded) {
            // Mark as loaded permanently
            setIsLoaded(true);
            setIsVisible(true);
            
            // Stop observing after loading
            observer.unobserve(element);
          }
        });
      },
      {
        rootMargin, // Start loading before element enters viewport
        threshold,  // Trigger when 1% is visible
      }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isLoaded, rootMargin, threshold]);

  return (
    <div 
      ref={ref} 
      style={{ 
        minHeight: isLoaded ? 'auto' : minHeight,
        width: '100%',
      }}
    >
      {isLoaded ? children : fallback}
    </div>
  );
}

/**
 * LazyComponent - Simple wrapper for lazy loading with Suspense
 * Use this for smaller components that don't need viewport detection
 */
export function LazyComponent({ children, fallback = <ComponentLoader /> }) {
  return (
    <React.Suspense fallback={fallback}>
      {children}
    </React.Suspense>
  );
}

/**
 * ComponentLoader - Default loading skeleton
 */
function ComponentLoader() {
  return (
    <div style={{
      width: '100%',
      height: '200px',
      background: 'linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%)',
      backgroundSize: '200% 100%',
      animation: 'shimmer 1.5s infinite',
      borderRadius: '12px',
      marginBottom: '20px',
    }}>
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </div>
  );
}

/**
 * useLazyLoad - Hook for custom lazy loading logic
 */
export function useLazyLoad(rootMargin = "200px", threshold = 0.01) {
  const [isLoaded, setIsLoaded] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsLoaded(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isLoaded, rootMargin, threshold]);

  return [ref, isLoaded];
}
