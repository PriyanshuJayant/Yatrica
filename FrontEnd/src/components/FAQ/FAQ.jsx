import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { Badge } from "../ui/badge";

function FAQItem({ question, answer, index, isOpen, toggleOpen }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        delay: index * 0.15,
        ease: "easeOut",
      }}
      style={{
        border: "1px solid #ddd",
        marginBottom: "10px",
        backgroundColor: isOpen ? "#f9f9f9" : "#fff",
        boxShadow: isOpen ? "0 2px 6px rgba(0,0,0,0.08)" : "none",
        transition: "all 0.25s ease",
        borderRadius:"20px",
      }}
    >
      <button
        type="button"
        onClick={() => toggleOpen(index)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "16px 20px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
        }}
      >
        <h3
          style={{
            margin: 0,
            fontSize: "16px",
            fontWeight: "500",
            color: isOpen ? "#000" : "#333",
            transition: "color 0.2s ease",
          }}
        >
          {question}
        </h3>

        <motion.div
          animate={{
            rotate: isOpen ? 180 : 0,
            scale: isOpen ? 1.1 : 1,
          }}
          transition={{
            duration: 0.3,
            ease: "easeInOut",
          }}
          style={{
            color: isOpen ? "#007bff" : "#888",
            transition: "color 0.2s ease",
          }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: "auto",
              opacity: 1,
              transition: {
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.25, delay: 0.1 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: { duration: 0.3, ease: "easeInOut" },
                opacity: { duration: 0.25 },
              },
            }}
          >
            <div
              style={{
                borderTop: "1px solid #eee",
                padding: "10px 20px 16px",
                backgroundColor: "#fafafa",
              }}
            >
              <motion.p
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                style={{
                  fontSize: "14px",
                  color: "#555",
                  lineHeight: "1.6",
                  margin: 0,
                }}
              >
                {answer}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQs() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleOpen = (index) => {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      // Close current first, then open new one
      setOpenIndex(null);
      setTimeout(() => setOpenIndex(index), 150);
    }
  };

  const faqs = [
    {
      question: "What makes MVPBlocks unique?",
      answer:
        "MVPBlocks stands out through its intuitive design, powerful component library, and seamless integration options.",
    },
    {
      question: "How can I customize the components?",
      answer:
        "All components are built with Tailwind CSS, making them highly customizable.",
    },
    {
      question: "Do the components work with dark mode?",
      answer:
        "Yes, all MVPBlocks components are designed to work seamlessly with both light and dark modes.",
    },
    {
      question: "How can I get started with MVPBlocks?",
      answer:
        "You can get started by browsing our component library and copying the code for the components you need.",
    },
    {
      question: "Can I use MVPBlocks for commercial projects?",
      answer:
        "Absolutely! MVPBlocks is free to use for both personal and commercial projects.",
    },
  ];

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "80px 0",
        backgroundColor: "#fff",
        borderRadius:"20px",
          boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px",
      }}
    >
      {/* Decorative Blurs */}

      <div
        style={{
          position: "absolute",
          bottom: "80px",
          right: "-120px",
          width: "260px",
          height: "260px",
          borderRadius: "50%",
          background: "rgba(0, 123, 255, 0.05)",
          filter: "blur(80px)",
        }}
      />

      <div
        style={{
          position: "relative",
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 20px",
          display: "flex",
          flexWrap: "wrap",
          gap: "40px",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT COLUMN */}
        <div style={{ flex: "1 1 40%", minWidth: "300px" }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: "48px" }}
          >
            <Badge variant="outline" style={{ marginBottom: "12px" }}>
              FAQs
            </Badge>
            <h2
              style={{
                fontSize: "28px",
                fontWeight: "700",
                color: "#000",
                margin: "0 0 8px",
              }}
            >
              Frequently Asked Questions
            </h2>
            <p style={{ color: "#777", fontSize: "14px" }}>
              Everything you need to know about MVPBlocks
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              maxWidth: "400px",
              textAlign: "left",
              padding: "24px",
              borderRadius: "10px",
              backgroundColor: "#f9f9f9",
            }}
          >
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                backgroundColor: "rgba(0, 123, 255, 0.1)",
                color: "#007bff",
                marginBottom: "12px",
              }}
            >
              <Mail size={16} />
            </div>
            <p style={{ fontWeight: 600, margin: "0 0 4px" }}>
              Still have questions?
            </p>
            <p style={{ color: "#666", fontSize: "13px", marginBottom: "12px" }}>
              We're here to help you
            </p>
            <button
              type="button"
              style={{
                backgroundColor: "#007bff",
                color: "#fff",
                padding: "10px 18px",
                border: "none",
                borderRadius: "6px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) =>
                (e.target.style.backgroundColor = "#0069d9")
              }
              onMouseOut={(e) =>
                (e.target.style.backgroundColor = "#007bff")
              }
            >
              Contact Support
            </button>
          </motion.div>
        </div>

        {/* RIGHT COLUMN */}
        <div style={{ flex: "1 1 55%", minWidth: "300px" }}>
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              {...faq}
              index={index}
              isOpen={openIndex === index}
              toggleOpen={toggleOpen}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
