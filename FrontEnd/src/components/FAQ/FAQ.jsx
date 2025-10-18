import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Mail } from "lucide-react";
import { Badge } from "../ui/badge";
import {Link} from 'react-router-dom'

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
        borderRadius: "20px",
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
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            color: isOpen ? "#61daff" : "#888",
            transition: "color 0.2s ease",
            transformOrigin: "center",
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
      question: "What makes Yatrica different from other travel companies?",
      answer:
        "Yatrica stands out for its personalized itineraries, honest pricing, and local expertise. We don’t offer generic trips — every package is hand-crafted to deliver the perfect balance of comfort, adventure, and authentic experiences.",
    },
    {
      question: "Can I customize a travel package to suit my needs?",
      answer:
        "Absolutely! Every traveler is unique — you can adjust destinations, duration, budget, and experiences. Our team will redesign the itinerary to match your preferences and send you a personalized quote.",
    },
    {
      question:
        "Are flights, hotels, and activities included in the package price?",
      answer:
        "Most packages include accommodation, sightseeing, and key activities. Flights are optional and can be added based on your departure city and travel dates. Each itinerary clearly mentions inclusions and exclusions before you book.",
    },
    {
      question: "How can I book or get a quote for a trip?",
      answer:
        "You can easily submit a Quote Inquiry form on our website, and our travel team will contact you within 24 hours with details and pricing. Once confirmed, you can secure your booking through our online payment options or direct assistance.",
    },
    {
      question: "What if my travel plans change or I need to cancel?",
      answer:
        "We understand that plans can change. Yatrica offers flexible modification and cancellation options depending on the package and booking date. Our support team will guide you through rescheduling or refund options — ensuring you don’t lose your travel investment unnecessarily.",
    },
  ];
  // -------------Responsiveness-------------
  // const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  // useEffect(() => {
  //   const handleResize = () => setIsMobile(window.innerWidth <= 768);
  //   window.addEventListener("resize", handleResize);
  //   return () => window.removeEventListener("resize", handleResize);
  // }, []);
  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        overflow: "hidden",
        padding: "80px 0",
        backgroundColor: "#fff",
        borderRadius: "20px",
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
              Everything you need to know about Yatrica
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
                color: "#61daff",
                marginBottom: "12px",
              }}
            >
              <Mail size={16} />
            </div>
            <p style={{ fontWeight: 600, margin: "0 0 4px" }}>
              Still have questions?
            </p>
            <p
              style={{ color: "#666", fontSize: "13px", marginBottom: "12px" }}
            >
              We're here to help you
            </p>
              <Link to="/contact">
            <button
              type="button"
              style={{
                backgroundColor: "#61daff",
                color: "#fff",
                padding: "10px 18px",
                border: "none",
                borderRadius: "6px",
                fontWeight: 500,
                cursor: "pointer",
                transition: "background-color 0.2s ease",
              }}
              onMouseOver={(e) => (e.target.style.backgroundColor = "#00c3ff")}
              onMouseOut={(e) => (e.target.style.backgroundColor = "#61daff")}
            >
              Contact Support
            </button>
              </Link>
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
