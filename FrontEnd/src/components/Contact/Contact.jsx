import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, MessageSquare } from "lucide-react";
// -------------------- STYLES ------------------------
import styles from "./Contact.module.css";
import WorldMapDemo, { WorldMap } from "../../components/ui/world-map";

// =====================================================
//                     Corporate Packages
// =====================================================
function FormField({
  icon: Icon,
  label,
  name,
  type,
  placeholder,
  value,
  onChange,
  focusedField,
  setFocusedField,
  required = true,
  isTextarea = false,
  rows = 3,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: "18px" }}
    >
      <label
        style={{
          display: "block",
          fontSize: "11px",
          fontWeight: "600",
          color: "#333",
          marginBottom: "8px",
          letterSpacing: "0.5px",
          textTransform: "uppercase",
        }}
      >
        {label}
        {required && <span style={{ color: "#dc2626" }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        <Icon
          size={18}
          style={{
            position: "absolute",
            left: "14px",
            top: isTextarea ? "14px" : "50%",
            transform: isTextarea ? "none" : "translateY(-50%)",
            color: focusedField === name ? "#42a5f5" : "#888",
            transition: "color 0.2s ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            required={required}
            rows={rows}
            style={{
              width: "100%",
              padding: "12px 14px 12px 44px",
              border: `2px solid ${focusedField === name ? "#42a5f5" : "#ddd"}`,
              borderRadius: "10px",
              fontSize: "14px",
              backgroundColor: focusedField === name ? "#fff" : "#f9f9f9",
              transition: "all 0.3s ease",
              outline: "none",
              boxSizing: "border-box",
              boxShadow:
                focusedField === name
                  ? "0 0 0 3px rgba(0, 123, 255, 0.1)"
                  : "none",
              fontFamily: "inherit",
              resize: "vertical",
            }}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            required={required}
            style={{
              width: "100%",
              padding: "12px 14px 12px 44px",
              border: `2px solid ${focusedField === name ? "#42a5f5" : "#ddd"}`,
              borderRadius: "10px",
              fontSize: "14px",
              backgroundColor: focusedField === name ? "#fff" : "#f9f9f9",
              transition: "all 0.3s ease",
              outline: "none",
              boxSizing: "border-box",
              boxShadow:
                focusedField === name
                  ? "0 0 0 3px rgba(0, 123, 255, 0.1)"
                  : "none",
            }}
          />
        )}
      </div>
    </motion.div>
  );
}

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: "success",
          message:
            "Thank you! We have received your message and will contact you soon.",
        });
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.error || "Failed to send message. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  return (
    <>
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
        <div
          style={{
            position: "relative",
            maxWidth: "1100px",
            margin: "0 auto",
            padding: "0 20px",
            display: "flex",
            flexWrap: "wrap",
            gap: "40px",
            // alignItems: 'flex-start'
          }}
        >
          {/* LEFT COLUMN - Contact Form */}
          <div style={{ flex: "1 1 35%", minWidth: "300px" }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: "15px" }}
            >
              <div
                style={{
                  display: "inline-block",
                  padding: "4px 12px",
                  border: "1px solid gray",
                  borderRadius: "20px",
                  fontSize: "12px",
                  fontWeight: "500",
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  color: "#2f65b5",
                  marginBottom: "12px",
                }}
              >
                Get In Touch
              </div>

              <h2
                style={{
                  fontSize: "28px",
                  fontWeight: "700",
                  color: "#000",
                  margin: "0 0 8px",
                }}
              >
                Contact Us
              </h2>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
            >
              <FormField
                icon={User}
                label="Full Name"
                name="name"
                type="text"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              <FormField
                icon={Mail}
                label="Email Address"
                name="email"
                type="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              <FormField
                icon={Phone}
                label="Phone Number"
                name="phone"
                type="tel"
                placeholder="+91 (000) 000-0000"
                value={formData.phone}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />

              <FormField
                icon={MessageSquare}
                label="Message"
                name="message"
                type="text"
                placeholder="Tell us how we can help you..."
                value={formData.message}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
                isTextarea={true}
                rows={3}
              />

              {/* Status Message */}
              {submitStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  style={{
                    padding: "12px 16px",
                    borderRadius: "8px",
                    marginBottom: "16px",
                    backgroundColor:
                      submitStatus.type === "success" ? "#d4edda" : "#f8d7da",
                    border: `1px solid ${
                      submitStatus.type === "success" ? "#c3e6cb" : "#f5c6cb"
                    }`,
                    color:
                      submitStatus.type === "success" ? "#155724" : "#721c24",
                    fontSize: "14px",
                    fontWeight: "500",
                  }}
                >
                  {submitStatus.message}
                </motion.div>
              )}

              <motion.button
                type="submit"
                disabled={isSubmitting}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                whileHover={{
                  scale: isSubmitting ? 1 : 1.02,
                  boxShadow: isSubmitting
                    ? "0 4px 12px rgba(0, 123, 255, 0.2)"
                    : "0 6px 20px rgba(0, 123, 255, 0.3)",
                }}
                whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                style={{
                  width: "100%",
                  padding: "14px 32px",
                  backgroundColor: isSubmitting ? "#6c757d" : "#2196f3",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  fontWeight: "600",
                  fontSize: "15px",
                  cursor: isSubmitting ? "not-allowed" : "pointer",
                  transition: "all 0.3s ease",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  boxShadow: "0 4px 12px rgba(0, 123, 255, 0.2)",
                  opacity: isSubmitting ? 0.7 : 1,
                }}
                onMouseOver={(e) =>
                  !isSubmitting &&
                  (e.currentTarget.style.backgroundColor = "#42a5f5")
                }
                onMouseOut={(e) =>
                  !isSubmitting &&
                  (e.currentTarget.style.backgroundColor = "#2196f3")
                }
              >
                <span>{isSubmitting ? "Sending..." : "Send Message"}</span>
                {!isSubmitting && (
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                )}
                {isSubmitting && (
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                    style={{ display: "inline-block" }}
                  >
                    ⏳
                  </motion.span>
                )}
              </motion.button>
            </motion.form>
          </div>

          {/* RIGHT COLUMN - World Map */}
          <div
            style={{
              flex: "1 1 60%",
              minWidth: "300px",
              backgroundColor: "#f9f9f9",
              borderRadius: "12px",
              overflow: "hidden",
              display: "flex",
              alignItems: "stretch",
            }}
          >
            <WorldMapDemo/>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
