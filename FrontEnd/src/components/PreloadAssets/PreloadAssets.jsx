import { useEffect } from 'react';

/**
 * PreloadAssets - Preload critical assets for faster initial render
 * Use this for above-the-fold images, videos, and fonts
 */
export function PreloadAssets({ assets = [] }) {
  useEffect(() => {
    if (!assets || assets.length === 0) return;

    const preloadLinks = [];

    assets.forEach((asset) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      
      // Determine asset type
      if (asset.endsWith('.woff2') || asset.endsWith('.woff')) {
        link.as = 'font';
        link.type = asset.endsWith('.woff2') ? 'font/woff2' : 'font/woff';
        link.crossOrigin = 'anonymous';
      } else if (asset.endsWith('.mp4') || asset.endsWith('.webm')) {
        link.as = 'video';
        link.type = asset.endsWith('.mp4') ? 'video/mp4' : 'video/webm';
      } else if (asset.match(/\.(jpg|jpeg|png|webp|gif|svg)$/i)) {
        link.as = 'image';
      } else if (asset.endsWith('.css')) {
        link.as = 'style';
      } else if (asset.endsWith('.js')) {
        link.as = 'script';
      }

      link.href = asset;
      document.head.appendChild(link);
      preloadLinks.push(link);
    });

    // Cleanup on unmount
    return () => {
      preloadLinks.forEach((link) => {
        if (link.parentNode) {
          document.head.removeChild(link);
        }
      });
    };
  }, [assets]);

  return null; // This component doesn't render anything
}

/**
 * usePrefetch - Hook to prefetch resources in the background
 */
export function usePrefetch(urls = [], when = true) {
  useEffect(() => {
    if (!when || !urls || urls.length === 0) return;

    const prefetchLinks = [];

    urls.forEach((url) => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = url;
      document.head.appendChild(link);
      prefetchLinks.push(link);
    });

    return () => {
      prefetchLinks.forEach((link) => {
        if (link.parentNode) {
          document.head.removeChild(link);
        }
      });
    };
  }, [urls, when]);
}

/**
 * Critical CSS - Inline critical CSS for faster first paint
 */
export function InlineCriticalCSS({ css }) {
  useEffect(() => {
    if (!css) return;

    const style = document.createElement('style');
    style.textContent = css;
    style.setAttribute('data-critical', 'true');
    document.head.appendChild(style);

    return () => {
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, [css]);

  return null;
}

/**
 * DNS Prefetch - Resolve DNS for external domains early
 */
export function DNSPrefetch({ domains = [] }) {
  useEffect(() => {
    if (!domains || domains.length === 0) return;

    const links = [];

    domains.forEach((domain) => {
      // DNS Prefetch
      const dnsPrefetch = document.createElement('link');
      dnsPrefetch.rel = 'dns-prefetch';
      dnsPrefetch.href = domain;
      document.head.appendChild(dnsPrefetch);
      links.push(dnsPrefetch);

      // Preconnect (includes DNS + TLS)
      const preconnect = document.createElement('link');
      preconnect.rel = 'preconnect';
      preconnect.href = domain;
      document.head.appendChild(preconnect);
      links.push(preconnect);
    });

    return () => {
      links.forEach((link) => {
        if (link.parentNode) {
          document.head.removeChild(link);
        }
      });
    };
  }, [domains]);

  return null;
}

export default PreloadAssets;
