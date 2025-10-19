
import { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, MessageSquare } from 'lucide-react';
// -------------------- STYLES ------------------------
import styles from "./ContactPage.module.css";

// -------------------- COMPONENT IMPORTS -------------
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";

// =====================================================
//                     Corporate Packages
// =====================================================
function FormField({ icon: Icon, label, name, type, placeholder, value, onChange, focusedField, setFocusedField, required = true, isTextarea = false }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ marginBottom: '20px' }}
    >
      <label style={{
        display: 'block',
        fontSize: '11px',
        fontWeight: '600',
        color: '#333',
        marginBottom: '8px',
        letterSpacing: '0.5px',
        textTransform: 'uppercase'
      }}>
        {label}{required && <span style={{ color: '#dc2626' }}>*</span>}
      </label>
      <div style={{ position: 'relative' }}>
        <Icon size={18} style={{
          position: 'absolute',
          left: '14px',
          top: isTextarea ? '14px' : '50%',
          transform: isTextarea ? 'none' : 'translateY(-50%)',
          color: focusedField === name ? '#42a5f5' : '#888',
          transition: 'color 0.2s ease',
          pointerEvents: 'none',
          zIndex: 1
        }} />
        {isTextarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            onFocus={() => setFocusedField(name)}
            onBlur={() => setFocusedField(null)}
            placeholder={placeholder}
            required={required}
            rows="5"
            style={{
              width: '100%',
              padding: '12px 14px 12px 44px',
              border: `2px solid ${focusedField === name ? '#42a5f5' : '#ddd'}`,
              borderRadius: '10px',
              fontSize: '14px',
              backgroundColor: focusedField === name ? '#fff' : '#f9f9f9',
              transition: 'all 0.3s ease',
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: focusedField === name ? '0 0 0 3px rgba(0, 123, 255, 0.1)' : 'none',
              fontFamily: 'inherit',
              resize: 'vertical'
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
              width: '100%',
              padding: '12px 14px 12px 44px',
              border: `2px solid ${focusedField === name ? '#42a5f5' : '#ddd'}`,
              borderRadius: '10px',
              fontSize: '14px',
              backgroundColor: focusedField === name ? '#fff' : '#f9f9f9',
              transition: 'all 0.3s ease',
              outline: 'none',
              boxSizing: 'border-box',
              boxShadow: focusedField === name ? '0 0 0 3px rgba(0, 123, 255, 0.1)' : 'none'
            }}
          />
        )}
      </div>
    </motion.div>
  );
}


function ContactPage() {
    const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
    const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Contact request submitted! Our team will get back to you soon.');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  return (
    <>
      <div className={styles.homePageContainer}>
        {/* -------------------- NAVBAR & HERO -------------------- */}
        <NavBar />
        <div className={styles.pageContainer}>
          hello
        </div>
        {/* -------------------- FOOTER -------------------- */}
        <Footer />
      </div>
    </>
  );
}

export default ContactPage;