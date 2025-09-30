import React, {
  useState,
  useEffect,
  useCallback,
  Children,
  cloneElement,
} from "react";
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

// Image component for use within Carousel
const Image = ({
  src,
  alt = "",
  placeholder,
  style = {},
  className = "",
  ...props
}) => {
  if (src) {
    return (
      <img
        src={src}
        alt={alt}
        style={{ ...styles.image, ...style }}
        className={className}
        {...props}
      />
    );
  }

  return (
    <div
      style={{ ...styles.placeholderImage, ...style }}
      className={className}
      {...props}
    >
      {placeholder || alt || "Image"}
    </div>
  );
};

// Main Carousel component
const Carousel = ({
  children,
  autoScroll = false,
  autoScrollInterval = 3000,
  showControls = true,
  showIndicators = true,
  showAutoScrollToggle = true,
  infinite = true,
  animationDuration = 500,
  animationTransition = "spring",
  height = "400px",
  width = "100%",
  maxWidth = "800px",
  style = {},
  className = "",
  onSlideChange,
  ...props
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoScrolling, setIsAutoScrolling] = useState(autoScroll);
  const [progress, setProgress] = useState(0);

  // Convert children to array and filter out non-Image components
  const imageChildren = Children.toArray(children).filter(
    (child) =>
      child.type === Image ||
      (child.props && (child.props.src || child.props.placeholder))
  );

  // If no children provided, show default placeholders
  const slides =
    imageChildren.length > 0
      ? imageChildren
      : [
          <Image key={1} placeholder="Image 1" />,
          <Image key={2} placeholder="Image 2" />,
          <Image key={3} placeholder="Image 3" />,
          <Image key={4} placeholder="Image 4" />,
          <Image key={5} placeholder="Image 5" />,
        ];

  const totalSlides = slides.length;

  const nextImage = useCallback(() => {
    const newIndex = infinite
      ? currentIndex === totalSlides - 1
        ? 0
        : currentIndex + 1
      : Math.min(currentIndex + 1, totalSlides - 1);

    setCurrentIndex(newIndex);
    onSlideChange && onSlideChange(newIndex);
  }, [currentIndex, totalSlides, infinite, onSlideChange]);

  const prevImage = useCallback(() => {
    const newIndex = infinite
      ? currentIndex === 0
        ? totalSlides - 1
        : currentIndex - 1
      : Math.max(currentIndex - 1, 0);

    setCurrentIndex(newIndex);
    onSlideChange && onSlideChange(newIndex);
  }, [currentIndex, totalSlides, infinite, onSlideChange]);

  const goToImage = (index) => {
    setCurrentIndex(index);
    onSlideChange && onSlideChange(index);
  };

  const toggleAutoScroll = () => {
    setIsAutoScrolling(!isAutoScrolling);
  };

  // Auto scroll functionality
  useEffect(() => {
    let interval;
    let progressInterval;

    if (isAutoScrolling && totalSlides > 1) {
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
  }, [isAutoScrolling, autoScrollInterval, nextImage, totalSlides]);

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

  const springConfig = {
    type: "spring",
    stiffness: 300,
    damping: 30,
  };

  const tweenConfig = {
    type: "tween",
    duration: animationDuration / 1000,
    ease: "easeInOut",
  };

  const transitionType =
    animationTransition === "spring" ? springConfig : tweenConfig;

  const animationConfig = {
    x: transitionType,
    opacity: { duration: animationDuration / 1000 },
  };

  return (
    <div
      style={{
        ...styles.carousel,
        width: width,
        maxWidth: maxWidth,
        ...style,
      }}
      className={className}
      {...props}
    >
      <div
        style={{
          ...styles.imageContainer,
          height: height,
        }}
      >
        <AnimatePresence initial={false} custom={currentIndex}>
          <motion.div
            key={currentIndex}
            custom={currentIndex}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={animationConfig}
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
            {cloneElement(slides[currentIndex], {
              style: {
                ...slides[currentIndex].props.style,
                width: "100%",
                height: "100%",
              },
            })}
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
        {showControls && totalSlides > 1 && (
          <>
            <button
              style={{ ...styles.controls, ...styles.prevButton }}
              onClick={prevImage}
              disabled={!infinite && currentIndex === 0}
              onMouseEnter={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }
              }}
            >
              &#8249;
            </button>
            <button
              style={{ ...styles.controls, ...styles.nextButton }}
              onClick={nextImage}
              disabled={!infinite && currentIndex === totalSlides - 1}
              onMouseEnter={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                  e.target.style.transform = "translateY(-50%) scale(1.1)";
                }
              }}
              onMouseLeave={(e) => {
                if (!e.target.disabled) {
                  e.target.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                  e.target.style.transform = "translateY(-50%) scale(1)";
                }
              }}
            >
              &#8250;
            </button>
          </>
        )}



        {/* Indicators */}
        {showIndicators && totalSlides > 1 && (
          <div style={styles.indicators}>
            {slides.map((_, index) => (
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

// Demo component showing different usage patterns
const CarouselComp = () => {
  return (
    <>
      {`// Basic usage
<Carousel>
  <Image src="image1.jpg" alt="Description" />
  <Image src="image2.jpg" alt="Description" />
</Carousel>

// With all options
<Carousel
  autoScroll={true}
  autoScrollInterval={3000}
  showControls={true}
  showIndicators={true}
  infinite={true}
  animationDuration={1000}
  animationTransition="spring"
  height="500px"
  width="100%"
  maxWidth="900px"
  onSlideChange={(index) => console.log(index)}
>
  <Image src="path/to/image1.jpg" alt="Image 1" />
  <Image src="path/to/image2.jpg" alt="Image 2" />
  <Image placeholder="Custom Placeholder" />
</Carousel>`}
    </>
  );
};

// Export both components
export { Carousel, Image };
export default CarouselComp;
