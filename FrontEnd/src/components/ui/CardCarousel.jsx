import React, { useState, useEffect, useRef, Children } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

// Image Component
export const Image = ({ src, alt, title }) => {
  return (
    <div style={{
      position: 'relative',
      height: '100%',
      borderRadius: '8px',
      overflow: 'hidden',
      boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
    }}>
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          userSelect: 'none',
        }}
        draggable="false"
      />
      {title && (
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
          padding: '16px',
          color: 'white',
        }}>
          <h3 style={{ margin: 0, fontSize: '18px', fontWeight: '600' }}>{title}</h3>
        </div>
      )}
    </div>
  );
};

// InfiniteCarousel Component
export const InfiniteCarousel = ({
  children,
  autoScroll = false,
  autoScrollInterval = 3000,
  showControls = true,
  height = '400px',
  width = '100%',
  maxWidth = '1200px',
  animationTransition = 'smooth',
  imagesShown = 3,
  innerImageHeight = '300px',
  innerImageWidth = 'auto',
  gap = '16px',
}) => {
  const [currentIndex, setCurrentIndex] = useState(imagesShown);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const containerRef = useRef(null);
  const autoPlayRef = useRef(null);

  const childrenArray = Children.toArray(children);
  const totalImages = childrenArray.length;

  // Create extended array for seamless infinite looping
  const extendedChildren = [
    ...childrenArray.slice(-imagesShown), // Last images at start
    ...childrenArray,                      // Original images
    ...childrenArray.slice(0, imagesShown) // First images at end
  ];

  const slideWidth = 100 / imagesShown;

  // Get transition duration based on animation type
  const getTransitionDuration = () => {
    if (animationTransition === 'spring') return 0.6;
    if (animationTransition === 'fast') return 0.3;
    if (animationTransition === 'slow') return 0.8;
    return 0.5; // smooth (default)
  };

  const transitionDuration = getTransitionDuration();

  // Handle next slide
  const handleNext = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev + 1);
  };

  // Handle previous slide
  const handlePrev = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(prev => prev - 1);
  };

  // Handle transition end - reset position for infinite loop
  useEffect(() => {
    if (!isTransitioning) return;

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      
      // If we've gone past the end, jump back to the real start
      if (currentIndex >= totalImages + imagesShown) {
        setCurrentIndex(imagesShown);
      }
      // If we've gone before the start, jump to the real end
      else if (currentIndex < imagesShown) {
        setCurrentIndex(totalImages + imagesShown - 1);
      }
    }, transitionDuration * 1000);

    return () => clearTimeout(timer);
  }, [currentIndex, isTransitioning, totalImages, imagesShown, transitionDuration]);

  // Auto scroll functionality
  useEffect(() => {
    if (!autoScroll) return;

    autoPlayRef.current = setInterval(() => {
      handleNext();
    }, autoScrollInterval);

    return () => {
      if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current);
      }
    };
  }, [autoScroll, autoScrollInterval, currentIndex]);

  // Calculate which original images are currently visible
  const getVisibleImageIndices = () => {
    const indices = [];
    for (let i = 0; i < imagesShown; i++) {
      const actualIndex = (currentIndex - imagesShown + i) % totalImages;
      indices.push(actualIndex < 0 ? actualIndex + totalImages : actualIndex);
    }
    return indices;
  };

  const visibleIndices = getVisibleImageIndices();

  return (
    <div style={{ width, maxWidth, margin: '0 auto' }}>
      <div style={{ 
        position: 'relative', 
        height, 
        overflow: 'hidden'
      }}>
        {/* Carousel track */}
        <div
          ref={containerRef}
          style={{
            display: 'flex',
            height: '100%',
            alignItems: 'center',
            transform: `translateX(-${currentIndex * slideWidth}%)`,
            transition: isTransitioning ? `transform ${transitionDuration}s ease-in-out` : 'none',
          }}
        >
          {extendedChildren.map((child, index) => (
            <div
              key={index}
              style={{
                flex: `0 0 ${slideWidth}%`,
                height: innerImageHeight,
                width: innerImageWidth,
                padding: `0 calc(${gap} / 2)`,
                boxSizing: 'border-box',
              }}
            >
              {child}
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        {showControls && (
          <>
            <button
              onClick={handlePrev}
              disabled={isTransitioning}
              style={{
                display:"flex",
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                padding: '12px',
                cursor: isTransitioning ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 10,
                transition: 'all 0.2s',
                opacity: isTransitioning ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isTransitioning) {
                  e.currentTarget.style.transform = 'translateY(-50%)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%)';
              }}
            >
              <ChevronLeft size={24} color="#1f2937" />
            </button>

            <button
              onClick={handleNext}
              disabled={isTransitioning}
              style={{
                display:"flex",
                position: 'absolute',
                right: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: 'none',
                borderRadius: '50%',
                padding: '12px',
                cursor: isTransitioning ? 'not-allowed' : 'pointer',
                boxShadow: '0 2px 8px rgba(0,0,0,0.2)',
                zIndex: 10,
                transition: 'all 0.2s',
                opacity: isTransitioning ? 0.5 : 1,
              }}
              onMouseEnter={(e) => {
                if (!isTransitioning) {
                  e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(-50%) scale(1)';
              }}
            >
              <ChevronRight size={24} color="#1f2937" />
            </button>
          </>
        )}
      </div>


    </div>
  );
};

export default function CardCarousel() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f9fafb, #e5e7eb)',
      padding: '48px 24px',
    }}>

        {/* Example 1: Default Configuration */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
            Example 1: Default (3 images visible, auto-scroll)
          </h2>
          <InfiniteCarousel
            autoScroll={true}
            autoScrollInterval={4000}
            showControls={true}
            height="400px"
            width="100%"
            maxWidth="1000px"
            animationTransition="smooth"
            imagesShown={3}
            innerImageHeight="350px"
            gap="20px"
          >
            <Image src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=600" alt="Japan" title="Japan" />
            <Image src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=600" alt="Paris" title="Paris" />
            <Image src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=600" alt="Maldives" title="Maldives" />
            <Image src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=600" alt="Dubai" title="Dubai" />
            <Image src="https://images.unsplash.com/photo-1490642914619-7955a3fd483c?w=600" alt="New York" title="New York" />
          </InfiniteCarousel>
        </div>

        {/* Example 2: Single Image View */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
            Example 2: Single Image View (Spring Animation)
          </h2>
          <InfiniteCarousel
            autoScroll={false}
            showControls={true}
            height="500px"
            width="100%"
            maxWidth="600px"
            animationTransition="spring"
            imagesShown={1}
            innerImageHeight="450px"
            gap="0px"
          >
            <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800" alt="Mountains" title="Mountains" />
            <Image src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800" alt="Beach" title="Beach" />
            <Image src="https://images.unsplash.com/photo-1500534623283-312aade485b7?w=800" alt="Forest" title="Forest" />
            <Image src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800" alt="Snow" title="Snow" />
          </InfiniteCarousel>
        </div>

        {/* Example 3: Four Images View */}
        <div style={{ marginBottom: '64px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '600', marginBottom: '24px', color: '#1f2937' }}>
            Example 3: Four Images View (Fast Animation)
          </h2>
          <InfiniteCarousel
            autoScroll={true}
            autoScrollInterval={2500}
            showControls={true}
            height="300px"
            width="100%"
            maxWidth="1200px"
            animationTransition="fast"
            imagesShown={4}
            innerImageHeight="250px"
            gap="12px"
          >
            <Image src="https://images.unsplash.com/photo-1528164344705-47542687000d?w=400" alt="Image 1" title="Image 1" />
            <Image src="https://images.unsplash.com/photo-1511739001486-6bfe10ce785f?w=400" alt="Image 2" title="Image 2" />
            <Image src="https://images.unsplash.com/photo-1514282401047-d79a71a590e8?w=400" alt="Image 3" title="Image 3" />
            <Image src="https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400" alt="Image 4" title="Image 4" />
            <Image src="https://images.unsplash.com/photo-1490642914619-7955a3fd483c?w=400" alt="Image 5" title="Image 5" />
            <Image src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400" alt="Image 6" title="Image 6" />
          </InfiniteCarousel>
        </div>

          

{/* 
<InfiniteCarousel
  autoScroll={true}
  autoScrollInterval={4000}
  showControls={true}
  height="500px"
  width="100%"
  maxWidth="1000px"
  animationTransition="spring"
  imagesShown={3}
  innerImageHeight="350px"
  gap="20px"
>
  <Image src="image1.jpg" alt="Description" title="Title 1" />
  <Image src="image2.jpg" alt="Description" title="Title 2" />
  <Image src="image3.jpg" alt="Description" title="Title 3" />
  <Image src="image4.jpg" alt="Description" title="Title 4" />
  <Image src="image5.jpg" alt="Description" title="Title 5" />
</InfiniteCarousel> */}


    </div>
  );
}