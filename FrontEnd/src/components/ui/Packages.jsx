import cardsData from "../../data/cardsData.json";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

// Custom hook for outside click detection
const useOutsideClick = (ref, callback) => {
  useEffect(() => {
    const listener = (event) => {
      if (!ref.current || ref.current.contains(event.target)) {
        return;
      }
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

const CloseIcon = () => {
  return (
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
};

export default function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
  const [cardPosition, setCardPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
    height: 0,
  });
  const id = useId();
  const ref = useRef(null);

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  const handleCardClick = (card, event) => {
    // Prevent click if card is already active
    if (active?.title === card.title) {
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    // Calculate expanded dimensions
    const expandedWidth = rect.width + 200;
    const expandedHeight = Math.min(
      rect.height + 200,
      window.innerHeight - 100
    );

    // Calculate desired position (offset from original)
    let desiredTop = rect.top - 50;
    let desiredLeft = rect.left - 100;

    // Ensure the expanded card stays within viewport bounds
    const padding = 20; // Padding from viewport edges

    // Check top boundary
    if (desiredTop < padding) {
      desiredTop = padding;
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
      expandedWidth: expandedWidth,
      expandedHeight: expandedHeight,
    });
    setActive(card);
  };

  return (
    <div style={{ position: "relative", minHeight: "100vh" }}>
      <AnimatePresence>
        {active && typeof active === "object" && (
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
        {active && typeof active === "object" ? (
          <>
            <motion.button
              key={`button-${active.title}-${id}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1,
                top:cardPosition.expandedTop + 20,
               }}
              exit={{ opacity: 0, scale: 0.8 }}
              style={{
                display: "flex",
                position: "fixed",
                top: `${Math.max(10, cardPosition.top - 0 + 8)}px`,
                left: `${cardPosition.left + cardPosition.width + 90 - 32}px`,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
                borderRadius: "50%",
                height: "24px",
                width: "24px",
                border: "none",
                cursor: "pointer",
                zIndex: 101,
              }}
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>

            <motion.div
              key={`expanded-${active.title}-${id}`}
              ref={ref}
              initial={{
                position: "fixed",
                top: cardPosition.top,
                left: cardPosition.left,
                width: cardPosition.width,
                height: cardPosition.height,
                opacity: 1,
              }}
              animate={{
                position: "fixed",
                top: cardPosition.expandedTop,
                left: cardPosition.expandedLeft,
                width: cardPosition.expandedWidth,
                height: cardPosition.expandedHeight,
                opacity: 1,
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
                damping: 30,
                stiffness: 400,
                duration: 0.3,
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                backgroundColor: "#fff",
                borderRadius: "24px",
                overflow: "hidden",
                zIndex: 100,
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              }}
            >
              <div style={{ position: "relative" }}>
                <img
                  src={active.src}
                  alt={active.title}
                  style={{
                    width: "100%",
                    height: "320px",
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
                    padding: "16px",
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
                        fontSize: "16px",
                        margin: 0,
                      }}
                    >
                      {active.description}
                    </p>
                  </div>

                  <motion.a
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { delay: 0.1 } }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    style={{
                      padding: "12px 16px",
                      fontSize: "14px",
                      borderRadius: "9999px",
                      fontWeight: "bold",
                      backgroundColor: "#87CEEB",
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
                    <p style={{ margin: 0, whiteSpace: "pre-line" }}>
                      {active.content}
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </>
        ) : null}
      </AnimatePresence>

      <div
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          width: "100%",
          padding: "0 20px",
          overflowX: "auto",
          position: "relative",
          zIndex: 1,
        }}
      >
        <ul
          style={{
            display: "flex",
            gap: "16px",
            listStyle: "none",
            padding: 0,
            margin: 0,
            minWidth: "min-content",
          }}
        >
          {cardsData.map((card) => (
            <li
              key={card.title}
              onClick={(e) => {
                if (active?.title !== card.title) {
                  handleCardClick(card, e);
                }
              }}
              style={{
                padding: "16px",
                display: "flex",
                flexDirection: "column",
                borderRadius: "12px",
                cursor: "pointer",
                transition: "background-color 0.2s",
                minWidth: "300px",
                maxWidth: "300px",
                backgroundColor: "transparent",
                visibility: active?.title === card.title ? "hidden" : "visible",
                pointerEvents: active?.title === card.title ? "none" : "auto",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#fafafa")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  flexDirection: "column",
                  width: "100%",
                }}
              >
                <div>
                  <img
                    src={card.src}
                    alt={card.title}
                    style={{
                      height: "340px",
                      width: "100%",
                      borderRadius: "8px",
                      objectFit: "cover",
                      objectPosition: "top",
                    }}
                  />
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <h3
                    style={{
                      fontWeight: 500,
                      color: "#262626",
                      textAlign: "center",
                      fontSize: "16px",
                      margin: "0 0 4px 0",
                    }}
                  >
                    {card.title}
                  </h3>
                  <p
                    style={{
                      color: "#525252",
                      textAlign: "center",
                      fontSize: "16px",
                      margin: 0,
                    }}
                  >
                    {card.description}
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
