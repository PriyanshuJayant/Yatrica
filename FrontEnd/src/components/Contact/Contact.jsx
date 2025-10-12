import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, User, Phone, Mail } from "lucide-react";

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
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ flex: "1", minWidth: "200px" }}
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
            top: "50%",
            transform: "translateY(-50%)",
            color: focusedField === name ? "#007bff" : "#888",
            transition: "color 0.2s ease",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />
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
            border: `2px solid ${focusedField === name ? "#007bff" : "#ddd"}`,
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
      </div>
    </motion.div>
  );
}

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    // destination: '',
    name: "",
    phone: "",
    email: "",
    message: "",
    agreed: false,
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Quote request submitted! Our holiday expert will contact you soon.");
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  return (
    <>
        <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      padding: '80px 0',
      backgroundColor: '#fff',
      borderRadius: '20px',
      boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
    }}>

      <div style={{
        position: 'relative',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '0 20px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '40px',
        alignItems: 'flex-start'
      }}>
        {/* LEFT COLUMN - Header */}
        <div style={{ flex: '1 1 40%', minWidth: '300px' }}>        </div>

        {/* RIGHT COLUMN - Form */}
        <div style={{ flex: '1 1 55%', minWidth: '300px' }}></div>
      </div>
    </section>
    </>
  );
}
