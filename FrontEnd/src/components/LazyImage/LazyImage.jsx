import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyImage - Progressive image loading with blur-up effect
 * Supports WebP with fallbacks, responsive images, and intersection observer
 * 
 * @param {string} src - Image source URL
 * @param {string} alt - Alt text for accessibility
 * @param {string} className - CSS class name
 * @param {string} style - Inline styles
 * @param {string} placeholder - Placeholder image (base64 or URL)
 * @param {string} rootMargin - Intersection observer margin
 * @param {number} threshold - Intersection observer threshold
 */
export function LazyImage({
  src,
  alt = '',
  className = '',
  style = {},
  placeholder = null,
  rootMargin = '200px',
  threshold = 0.01,
  onLoad = null,
  onError = null,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const element = imgRef.current;
    if (!element) return;

    // If already in view or loaded, skip
    if (isInView || isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.unobserve(element);
          }
        });
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => {
      if (element) {
        observer.unobserve(element);
      }
    };
  }, [isInView, isLoaded, rootMargin, threshold]);

  const handleLoad = (e) => {
    setIsLoaded(true);
    if (onLoad) onLoad(e);
  };

  const handleError = (e) => {
    setHasError(true);
    if (onError) onError(e);
  };

  return (
    <img
      ref={imgRef}
      src={isInView ? src : placeholder || 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600"%3E%3Crect fill="%23f0f0f0" width="800" height="600"/%3E%3C/svg%3E'}
      alt={alt}
      className={className}
      style={{
        ...style,
        opacity: isLoaded ? 1 : 0.5,
        transition: 'opacity 0.3s ease-in-out',
      }}
      loading="lazy"
      onLoad={handleLoad}
      onError={handleError}
      {...props}
    />
  );
}

/**
 * LazyBackgroundImage - Lazy load background images
 */
export function LazyBackgroundImage({
  src,
  children,
  className = '',
  style = {},
  rootMargin = '200px',
  threshold = 0.01,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const divRef = useRef(null);

  useEffect(() => {
    const element = divRef.current;
    if (!element || isInView) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { rootMargin, threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [isInView, rootMargin, threshold]);

  useEffect(() => {
    if (isInView && src) {
      const img = new Image();
      img.src = src;
      img.onload = () => setIsLoaded(true);
    }
  }, [isInView, src]);

  return (
    <div
      ref={divRef}
      className={className}
      style={{
        ...style,
        backgroundImage: isLoaded ? `url(${src})` : 'none',
        backgroundColor: isLoaded ? 'transparent' : '#f0f0f0',
        transition: 'background-color 0.3s ease-in-out',
      }}
      {...props}
    >
      {children}
    </div>
  );
}

export default LazyImage;
