import React, { useEffect, useId, useRef, useState, useMemo, useCallback } from "react";
import { AnimatePresence, motion } from "motion/react";
import "./Packages.css";

// ✅ Data cache to prevent re-fetching
const dataCache = new Map();

// ✅ Custom hook for outside click detection (memoized callback)
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) return;
      callback(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, callback]);
};

// ✅ Close icon (unchanged)
const CloseIcon = () => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0, transition: { duration: 0.05 } }}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ height: "16px", width: "16px", color: "#000" }}
  >
    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
    <path d="M18 6l-12 12" />
    <path d="M6 6l12 12" />
  </motion.svg>
);

// ✅ Reusable Packages component
export function Packages({ src }) {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [active, setActive] = useState(null);
  const [cardPosition, setCardPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const id = useId();
  const ref = useRef(null);
  const containerRef = useRef(null);
  const previousSrcRef = useRef(null);

  // ✅ Memoize the source data to prevent unnecessary re-renders
  const memoizedSrc = useMemo(() => src, [JSON.stringify(src)]);

  // ✅ Fetch data dynamically from src with caching
  useEffect(() => {
    async function fetchData() {
      try {
        if (!memoizedSrc) {
          setCardsData([]);
          setLoading(false);
          return;
        }

        // If src is already the parsed JSON array (most common case from Home.jsx)
        if (Array.isArray(memoizedSrc)) {
          // Only update if data actually changed
          if (memoizedSrc.length > 0 && JSON.stringify(previousSrcRef.current) !== JSON.stringify(memoizedSrc)) {
            previousSrcRef.current = memoizedSrc;
            setCardsData(memoizedSrc);
          } else if (memoizedSrc.length > 0) {
            setCardsData(memoizedSrc);
          }
          setLoading(false);
          return;
        }

        // Generate cache key for string URLs
        const cacheKey = typeof memoizedSrc === 'string' ? memoizedSrc : `obj-${Date.now()}`;
        
        // Check cache first (only for URLs)
        if (typeof memoizedSrc === 'string' && dataCache.has(cacheKey)) {
          setCardsData(dataCache.get(cacheKey));
          setLoading(false);
          return;
        }

        // If src is a string assume it's a URL/path and fetch it
        if (typeof memoizedSrc === "string") {
          const response = await fetch(memoizedSrc);
          if (!response.ok)
            throw new Error(`HTTP ${response.status} ${response.statusText}`);
          const data = await response.json();
          dataCache.set(cacheKey, data);
          setCardsData(data);
          setLoading(false);
          return;
        }

        // If src is an object (could be a module default export), try to extract data
        if (typeof memoizedSrc === "object") {
          const data = memoizedSrc.default ?? memoizedSrc;
          if (Array.isArray(data)) {
            setCardsData(data);
          } else if (data && typeof data === "object") {
            const values = Object.values(data);
            setCardsData(values);
          }
          setLoading(false);
          return;
        }
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    }
    fetchData();
  }, [memoizedSrc]);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") setActive(null);
    }

    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  // ✅ Memoized callback to prevent re-renders
  const handleOutsideClick = useCallback(() => setActive(null), []);
  useOutsideClick(ref, handleOutsideClick);

  // ✅ Optimized card click handler
  const handleCardClick = useCallback((card, event) => {
    if (active?.title === card.title) {
      setActive(null);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    // Calculate expanded dimensions
    const expandedWidth = rect.width + 150;
    const expandedHeight = Math.min(
      rect.height + 250,
      window.innerHeight - 100
    );

    // Calculate desired position (offset from original)
    let desiredTop = rect.top - 50;
    let desiredLeft = rect.left - 100;

    // Ensure the expanded card stays within viewport bounds
    const padding = 20; // Padding from viewport edges
    const paddingTop = 100; // Top Padding 

    // Check top boundary
    if (desiredTop < paddingTop) {
      desiredTop = paddingTop;
    }

    // Check bottom boundary
    if (desiredTop + expandedHeight > window.innerHeight - padding) {
      desiredTop = window.innerHeight - expandedHeight - padding;
    }

    // Check left boundary
    if (desiredLeft < padding) {
      desiredLeft = padding;
    }

    // Check right boundary
    if (desiredLeft + expandedWidth > window.innerWidth - padding) {
      desiredLeft = window.innerWidth - expandedWidth - padding;
    }

    setCardPosition({
      top: rect.top,
      left: rect.left,
      width: rect.width,
      height: rect.height,
      expandedTop: desiredTop,
      expandedLeft: desiredLeft,
      expandedWidth,
      expandedHeight,
    });
    setActive(card);
  }, [active]);

  // -------------Responsiveness-------------
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Show loading state
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '16px',
        color: '#666'
      }}>
        Loading packages...
      </div>
    );
  }

  // ✅ Show error state
  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '16px',
        color: '#e53e3e'
      }}>
        Error loading packages: {error}
      </div>
    );
  }

  // ✅ Show empty state
  if (!cardsData || cardsData.length === 0) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '400px',
        fontSize: '16px',
        color: '#666'
      }}>
        No packages available
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      style={{ position: "relative", height: "auto", overflow: "hidden" }}
    >
      {/* Dim background when expanded */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 10,
            }}
            onClick={() => setActive(null)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {active ? (
          <>
            {/* Close Button */}
            <motion.button
              key={`button-${active.title}-${id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: 1,
                scale: 1,
                top: cardPosition.expandedTop + 20,
                left: cardPosition.expandedLeft + cardPosition.expandedWidth - 40,
              }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              style={{
                display: "flex",
                position: "fixed",
                top: `${Math.max(10, cardPosition.top + 8)}px`,
                left: `${cardPosition.left + cardPosition.width + (isMobile? 80 : 8)}px`,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                borderRadius: "50%",
                height: "24px",
                width: "24px",
                border: "none",
                cursor: "pointer",
                zIndex: 101,
                WebkitTapHighlightColor: "transparent",
              }}
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            {/* Expanded Card */}
            <motion.div
              key={`expanded-${active.title}-${id}`}
              ref={ref}
              initial={{
                position: "fixed",
                top: cardPosition.top,
                left: cardPosition.left,
                width: cardPosition.width,
                height: cardPosition.height,
              }}
              animate={{
                position: "fixed",
                top: cardPosition.expandedTop,
                left: cardPosition.expandedLeft,
                width: cardPosition.expandedWidth,
                height: cardPosition.expandedHeight,
              }}
              exit={{
                position: "fixed",
                top: cardPosition.top,
                left: cardPosition.left,
                width: cardPosition.width,
                height: cardPosition.height,
                opacity: 0,
              }}
              transition={{
                type: "spring",
                damping: 25,
                stiffness: 300,
                mass: 0.8,
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                borderRadius: "24px",
                overflow: "hidden",
                width: "70%",
                zIndex: 100,
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                willChange: "transform",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={active.src}
                  alt={active.title}
                  loading="eager"
                  decoding="async"
                  fetchpriority="high"
                  style={{
                    width: "100%",
                    height: "280px",
                    objectFit: "cover",
                    objectPosition: "top",
                  }}
                />
              </div>

              <div
                style={{
                  flex: 1,
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    padding: "2px 16px 6px",
                    gap: "12px",
                    flexShrink: 0,
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <h3
                      style={{
                        fontWeight: 500,
                        color: "#404040",
                        fontSize: "16px",
                        margin: "0 0 4px 0",
                      }}
                    >
                      {active.title}
                    </h3>
                    <p
                      style={{
                        color: "#525252",
                        fontSize: "14px",
                        margin: 0,
                      }}
                    >
                      ₹{active.description}
                    </p>
                  </div>

                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    // target="_blank"
                    style={{
                      padding: "12px 16px",
                      fontSize: "14px",
                      borderRadius: "9999px",
                      fontWeight: "bold",
                      backgroundColor: "#2196f3",
                      color: "#fff",
                      textDecoration: "none",
                      whiteSpace: "nowrap",
                      flexShrink: 0,
                    }}
                  >
                    {active.ctaText}
                  </motion.a>
                </div>

                <div
                  style={{
                    paddingLeft: "16px",
                    paddingRight: "16px",
                    paddingBottom: "16px",
                    flex: 1,
                    overflow: "auto",
                  }}
                >
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.15 } }}
                    exit={{ opacity: 0 }}
                    style={{
                      color: "#525252",
                      fontSize: "14px",
                      lineHeight: "1.6",
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        whiteSpace: "pre-line",
                        fontSize: "14px",
                      }}
                    >
                      {active.content}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      {/* Cards Grid */}
      <div
        className="CardsContainer"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          padding: "0 20px",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ul
          className="CardsUL"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "16px",
            listStyle: "none",
            padding: 0,
            margin: 0,
          }}
        >
          {cardsData.map((card) => (
            <li
              key={`${card.title}-${card.description}`}
              onClick={(e) => {
                if (active?.title !== card.title) handleCardClick(card, e);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                borderRadius: "16px",
                cursor: "pointer",
                width: "100%",
                maxWidth: "350px",
                backgroundColor: "transparent",
                visibility: active?.title === card.title ? "hidden" : "visible",
                pointerEvents: active?.title === card.title ? "none" : "auto",
                overflow: "hidden",
                position: "relative",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  height: "300px",
                  borderRadius: "16px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={card.src}
                  alt={card.title}
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  style={{
                    height: "100%",
                    width: "100%",
                    objectFit: "cover",
                    objectPosition: "center",
                    display: "block",
                    willChange: "auto",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: "50%",
                    background:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, transparent 100%)",
                    pointerEvents: "none",
                  }}
                />

                <div
                  style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    right: 0,
                    padding: "20px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-start",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 600,
                      color: "#ffffff",
                      fontSize: "18px",
                      margin: "0 0 4px 0",
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      color: "#ffffff",
                      fontSize: "14px",
                      margin: 0,
                      fontWeight: 500,
                      textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                    }}
                  >
                    ₹{card.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
