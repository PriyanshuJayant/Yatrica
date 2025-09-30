import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

// CSS Module styles (inline for demo - you would put this in carousel.module.css)
const styles = {
  carousel: {
    position: "relative",
    width: "100%",
    maxWidth: "800px",
    margin: "0 auto",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#f8f9fa",
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "400px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "12px",
  },
  placeholderImage: {
    width: "100%",
    height: "100%",
    backgroundColor: "#e9ecef",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    color: "#6c757d",
    fontWeight: "500",
  },
  controls: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    border: "none",
    borderRadius: "50%",
    width: "50px",
    height: "50px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "20px",
    fontWeight: "bold",
    transition: "all 0.3s ease",
    zIndex: 2,
  },
  prevButton: {
    left: "20px",
  },
  nextButton: {
    right: "20px",
  },
  indicators: {
    position: "absolute",
    bottom: "20px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "8px",
    zIndex: 2,
  },
  indicator: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    border: "2px solid white",
    backgroundColor: "transparent",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  indicatorActive: {
    backgroundColor: "white",
  },
  autoScrollToggle: {
    position: "absolute",
    top: "20px",
    right: "20px",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    color: "white",
    border: "none",
    borderRadius: "6px",
    padding: "8px 12px",
    fontSize: "14px",
    cursor: "pointer",
    zIndex: 2,
    transition: "all 0.3s ease",
  },
  progressBar: {
    position: "absolute",
    bottom: "0",
    left: "0",
    height: "4px",
    backgroundColor: "#007bff",
    zIndex: 2,
    transformOrigin: "left",
  },
};

const ImageCarousel = ({
  images = [],
  autoScroll = true,
  autoScrollInterval = 3000,
  showControls = true,
  showIndicators = false,
  showAutoScrollToggle = false,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(autoScroll);
  const [progress, setProgress] = useState(0);

  // Default dummy images if none provided
  const defaultImages = [
    { id: 1, src: "", alt: "Image 1", placeholder: "Image 1" },
    { id: 2, src: "", alt: "Image 2", placeholder: "Image 2" },
    { id: 3, src: "", alt: "Image 3", placeholder: "Image 3" },
    { id: 4, src: "", alt: "Image 4", placeholder: "Image 4" },
    { id: 5, src: "", alt: "Image 5", placeholder: "Image 5" },
  ];

  const imageList = images.length > 0 ? images : defaultImages;

  const nextImage = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === imageList.length - 1 ? 0 : prevIndex + 1
    );
  }, [imageList.length]);

  const prevImage = useCallback(() => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? imageList.length - 1 : prevIndex - 1
    );
  }, [imageList.length]);

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  // Auto scroll functionality
  useEffect(() => {
    let interval;
    let progressInterval;

    if (isAutoScrolling) {
      setProgress(0);

      // Progress bar animation
      progressInterval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            return 0;
          }
          return prev + 100 / (autoScrollInterval / 50);
        });
      }, 50);

      // Auto advance images
      interval = setInterval(() => {
        nextImage();
        setProgress(0);
      }, autoScrollInterval);
    }

    return () => {
      clearInterval(interval);
      clearInterval(progressInterval);
    };
  }, [isAutoScrolling, autoScrollInterval, nextImage]);

  // Reset progress when manually changing images
  useEffect(() => {
    if (isAutoScrolling) {
      setProgress(0);
    }
  }, [currentIndex, isAutoScrolling]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div style={styles.carousel}>
      <div style={styles.imageContainer}>
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset, velocity }) => {
              const swipe = swipePower(offset.x, velocity.x);

              if (swipe < -swipeConfidenceThreshold) {
                nextImage();
              } else if (swipe > swipeConfidenceThreshold) {
                prevImage();
              }
            }}
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
            }}
          >
            {imageList[currentIndex]?.src ? (
              <img
                src={imageList[currentIndex].src}
                alt={imageList[currentIndex].alt}
                style={styles.image}
              />
            ) : (
              <div style={styles.placeholderImage}>
                {imageList[currentIndex]?.placeholder ||
                  `Image ${currentIndex + 1}`}
              </div>
            )}
          </motion.div>
        </AnimatePresence>

        {/* Auto scroll progress bar */}
        {isAutoScrolling && (
          <motion.div
            style={{
              ...styles.progressBar,
              scaleX: progress / 100,
            }}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
          />
        )}

        {/* Navigation Controls */}
        {showControls && (
          <>
            <button
              style={{ ...styles.controls, ...styles.prevButton }}
              onClick={prevImage}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                e.target.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              &#8249;
            </button>
            <button
              style={{ ...styles.controls, ...styles.nextButton }}
              onClick={nextImage}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                e.target.style.transform = "translateY(-50%) scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                e.target.style.transform = "translateY(-50%) scale(1)";
              }}
            >
              &#8250;
            </button>
          </>
        )}

        {/* Auto Scroll Toggle */}
        {showAutoScrollToggle && (
          <button
            style={styles.autoScrollToggle}
            onClick={toggleAutoScroll}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "rgba(0, 0, 0, 0.9)";
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
            }}
          >
            {isAutoScrolling ? "Pause" : "Auto"}
          </button>
        )}

        {/* Indicators */}
        {showIndicators && (
          <div style={styles.indicators}>
            {imageList.map((_, index) => (
              <button
                key={index}
                style={{
                  ...styles.indicator,
                  ...(index === currentIndex ? styles.indicatorActive : {}),
                }}
                onClick={() => goToImage(index)}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    e.target.style.backgroundColor = "rgba(255, 255, 255, 0.5)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.target.style.backgroundColor = "transparent";
                  }
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// Demo component showing usage
const Carousel = () => {
  // Example with actual images (uncomment to use)

  const sampleImages = [
    {
      id: 1,
      src: "https://picsum.photos/800/400?random=1",
      alt: "Random Image 1",
    },
    {
      id: 2,
      src: "https://picsum.photos/800/400?random=2",
      alt: "Random Image 2",
    },
    {
      id: 3,
      src: "https://picsum.photos/800/400?random=3",
      alt: "Random Image 3",
    },
    {
      id: 4,
      src: "https://picsum.photos/800/400?random=4",
      alt: "Random Image 4",
    },
  ];

  return (
    <div
      style={{
        padding: "40px 20px",
        backgroundColor: "#f8f9fa",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: "40px", color: "#333" }}>
        Image Carousel
      </h1>

      <ImageCarousel
        images={sampleImages} // Uncomment to use actual images
        autoScroll={true}
        autoScrollInterval={4000}
        showControls={true}
        showIndicators={true}
        showAutoScrollToggle={true}
      />

      <div style={{ textAlign: "center", marginTop: "30px", color: "#666" }}>
        {/* <p>✨ Features:</p> */}
        {/* <p>• Smooth Framer Motion animations • Swipe/drag support • Auto-scroll with progress bar</p> */}
        {/* <p>• Navigation controls • Indicator dots • Fully customizable</p> */}
      </div>
    </div>
  );
};

export default Carousel;
