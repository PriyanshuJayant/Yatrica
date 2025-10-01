import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import cardsData from '../../data/cardsData.json';

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
      style={{ height: '16px', width: '16px', color: '#000' }}
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

export default function ExpandableCardDemo() {
  const [active, setActive] = useState(null);
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

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.2)',
              height: '100%',
              width: '100%',
              zIndex: 10
            }}
          />
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div style={{
            position: 'fixed',
            inset: 0,
            display: 'grid',
            placeItems: 'center',
            zIndex: 100
          }}>
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              style={{
                display: 'flex',
                position: 'absolute',
                top: '8px',
                right: '8px',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#fff',
                borderRadius: '50%',
                height: '24px',
                width: '24px',
                border: 'none',
                cursor: 'pointer'
              }}
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              style={{
                width: '100%',
                maxWidth: '500px',
                height: '100%',
                maxHeight: '90%',
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: '#fff',
                borderRadius: '24px',
                overflow: 'hidden'
              }}
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  style={{
                    width: '100%',
                    height: '320px',
                    borderTopLeftRadius: '8px',
                    borderTopRightRadius: '8px',
                    objectFit: 'cover',
                    objectPosition: 'top'
                  }}
                />
              </motion.div>

              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'start',
                  padding: '16px'
                }}>
                  <div>
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      style={{
                        fontWeight: 500,
                        color: '#404040',
                        fontSize: '16px',
                        margin: 0
                      }}
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      style={{
                        color: '#525252',
                        fontSize: '16px',
                        margin: 0
                      }}
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  <motion.a
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    href={active.ctaLink}
                    target="_blank"
                    style={{
                      padding: '12px 16px',
                      fontSize: '14px',
                      borderRadius: '9999px',
                      fontWeight: 'bold',
                      backgroundColor: '#22c55e',
                      color: '#fff',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    {active.ctaText}
                  </motion.a>
                </div>
                
                <div style={{
                  paddingTop: '16px',
                  position: 'relative',
                  paddingLeft: '16px',
                  paddingRight: '16px'
                }}>
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    style={{
                      color: '#525252',
                      fontSize: '14px',
                      height: '160px',
                      paddingBottom: '40px',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'start',
                      gap: '16px',
                      overflow: 'auto',
                      maskImage: 'linear-gradient(to bottom, white, white, transparent)',
                      scrollbarWidth: 'none',
                      msOverflowStyle: 'none',
                      WebkitOverflowScrolling: 'touch'
                    }}
                  >
                    <p style={{ margin: 0, whiteSpace: 'pre-line' }}>{active.content}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      
      <ul style={{
        maxWidth: '672px',
        margin: '0 auto',
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        alignItems: 'start',
        gap: '16px',
        listStyle: 'none',
        padding: 0
      }}>
        {cardsData.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            style={{
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              borderRadius: '12px',
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            whileHover={{ backgroundColor: '#fafafa' }}
          >
            <div style={{
              display: 'flex',
              gap: '16px',
              flexDirection: 'column',
              width: '100%'
            }}>
              <motion.div layoutId={`image-${card.title}-${id}`}>
                <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  style={{
                    height: '240px',
                    width: '100%',
                    borderRadius: '8px',
                    objectFit: 'cover',
                    objectPosition: 'top'
                  }}
                />
              </motion.div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column'
              }}>
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  style={{
                    fontWeight: 500,
                    color: '#262626',
                    textAlign: 'center',
                    fontSize: '16px',
                    margin: '0 0 4px 0'
                  }}
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  style={{
                    color: '#525252',
                    textAlign: 'center',
                    fontSize: '16px',
                    margin: 0
                  }}
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}