import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const FAQComponent = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Framer Motion?",
      answer:
        "Framer Motion is a production-ready motion library for React that makes it simple to create animations and interactions with a declarative API. It provides gesture support, layout animations, and server-side rendering capabilities.",
    },
    {
      question: "How do I get started with animations?",
      answer:
        "Getting started is easy! Install framer-motion via npm, import the motion components, and add animate props to define your animations. The library handles all the complex calculations and optimizations for smooth 60fps animations.",
    },
    {
      question: "Can I use it with TypeScript?",
      answer:
        "Yes! Framer Motion has excellent TypeScript support out of the box. All APIs are fully typed, providing great developer experience with auto-completion and type checking in your IDE.",
    },
    {
      question: "Is Framer Motion performant?",
      answer:
        "Absolutely! Framer Motion is optimized for performance. It uses the Web Animations API when possible, hardware acceleration for transforms, and smart batching to ensure your animations run at 60fps even on lower-end devices.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "40px 20px",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      }}
    >
      <h2
        style={{
          fontSize: "32px",
          fontWeight: "700",
          marginBottom: "40px",
          textAlign: "center",
          color: "#1a1a1a",
        }}
      >
        Frequently Asked Questions
      </h2>

      {/* FAQ Container with light background */}
      <div
        style={{
          backgroundColor: "#f8f9fa",
          padding: "32px",
          borderRadius: "24px",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
        }}
      >
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
              },
            },
          }}
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.5,
                    ease: "easeOut",
                  },
                },
              }}
              style={{
                marginBottom: index === faqs.length - 1 ? "0" : "16px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 2px 12px rgba(0, 0, 0, 0.04)",
                backgroundColor: "#ffffff",
                border: "1px solid rgba(0, 0, 0, 0.06)",
              }}
            >
              <motion.button
                onClick={() => toggleFAQ(index)}
                style={{
                  width: "100%",
                  padding: "24px 28px",
                  border: "none",
                  background: "transparent",
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  textAlign: "left",
                  fontSize: "18px",
                  fontWeight: "600",
                  color: "#1a1a1a",
                  transition: "background-color 0.2s ease",
                }}
                whileHover={{ backgroundColor: "rgba(0, 0, 0, 0.02)" }}
              >
                <span>{faq.question}</span>
                <motion.svg
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  style={{ flexShrink: 0 }}
                >
                  <path
                    d="M6 9L12 15L18 9"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </motion.svg>
              </motion.button>

              <AnimatePresence initial={false}>
                {openIndex === index && (
                  <motion.div
                    initial="collapsed"
                    animate="expanded"
                    exit="collapsed"
                    variants={{
                      expanded: {
                        height: "auto",
                        transition: {
                          height: {
                            duration: 0.4,
                            ease: "easeOut",
                          },
                        },
                      },
                      collapsed: {
                        height: 0,
                        transition: {
                          height: {
                            duration: 0.4,
                            ease: "easeOut",
                          },
                        },
                      },
                    }}
                    style={{
                      overflow: "hidden",
                    }}
                  >
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{
                        y: 0,
                        opacity: 1,
                        transition: {
                          y: {
                            duration: 0.4,
                            ease: "easeOut",
                          },
                          opacity: {
                            duration: 0.3,
                            delay: 0.1,
                          },
                        },
                      }}
                      exit={{
                        y: -20,
                        opacity: 0,
                        transition: {
                          y: {
                            duration: 0.3,
                            ease: "easeIn",
                          },
                          opacity: {
                            duration: 0.2,
                          },
                        },
                      }}
                      style={{
                        padding: "0 28px 24px",
                        fontSize: "16px",
                        lineHeight: "1.6",
                        color: "#666666",
                      }}
                    >
                      {faq.answer}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default FAQComponent;
