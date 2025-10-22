import React, { useState, useEffect, useRef } from 'react';

/**
 * LazyVideo - Viewport-based lazy loading for videos
 * Loads video only when near viewport, autoplay when visible
 * 
 * @param {string} src - Video source URL
 * @param {string} poster - Poster image (thumbnail)
 * @param {boolean} autoPlay - Auto-play when visible
 * @param {boolean} loop - Loop video
 * @param {boolean} muted - Mute video
 * @param {boolean} playsInline - Play inline on mobile
 * @param {string} className - CSS class name
 * @param {object} style - Inline styles
 * @param {string} rootMargin - Intersection observer margin
 * @param {number} threshold - Intersection observer threshold
 */
export function LazyVideo({
  src,
  poster = null,
  autoPlay = false,
  loop = false,
  muted = true,
  playsInline = true,
  controls = false,
  className = '',
  style = {},
  rootMargin = '400px', // Load earlier for videos (larger files)
  threshold = 0.01,
  eager = false, // Load immediately without lazy loading
  children,
  ...props
}) {
  const [isLoaded, setIsLoaded] = useState(eager); // If eager, start as loaded
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (isLoaded || eager) return; // Already loaded or eager loading

    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsLoaded(true);
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
  }, [isLoaded, eager, rootMargin, threshold]);

  // Intersection Observer for autoplay/pause
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlay || !isLoaded) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().then(() => {
              setIsPlaying(true);
            }).catch(() => {
              // Autoplay blocked, user interaction required
            });
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { 
        threshold: 0.01, // Play when any part is visible (1%)
        rootMargin: '0px' // No margin, pause only when completely out of view
      }
    );

    observer.observe(video);

    return () => {
      if (video) {
        observer.unobserve(video);
      }
    };
  }, [autoPlay, isLoaded]);

  return (
    <>
      {isLoaded ? (
        <div ref={containerRef} style={{ display: 'contents' }}>
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            autoPlay={autoPlay}
            loop={loop}
            muted={muted}
            playsInline={playsInline}
            controls={controls}
            className={className}
            style={style}
            {...props}
          >
            {children}
          </video>
        </div>
      ) : (
        // Placeholder with poster image
        <div
          ref={containerRef}
          className={className}
          style={{
            ...style,
            backgroundImage: poster ? `url(${poster})` : 'none',
            backgroundColor: '#1a1a1a',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {!poster && (
            <svg
              width="80"
              height="80"
              viewBox="0 0 24 24"
              fill="none"
              stroke="rgba(255,255,255,0.2)"
              strokeWidth="1.5"
            >
              <polygon points="5 3 19 12 5 21 5 3" fill="rgba(255,255,255,0.1)" />
            </svg>
          )}
        </div>
      )}
    </>
  );
}

/**
 * useVideoLazyLoad - Hook for custom video lazy loading
 */
export function useVideoLazyLoad(rootMargin = '400px', threshold = 0.01) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
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

  return { ref, isLoaded, isPlaying, setIsPlaying };
}

export default LazyVideo;
