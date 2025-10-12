import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, User, Phone, Mail } from 'lucide-react';

function FormField({ icon: Icon, label, name, type, placeholder, value, onChange, focusedField, setFocusedField, required = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      style={{ flex: '1', minWidth: '200px' }}
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
          top: '50%',
          transform: 'translateY(-50%)',
          color: focusedField === name ? '#007bff' : '#888',
          transition: 'color 0.2s ease',
          pointerEvents: 'none',
          zIndex: 1
        }} />
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
            border: `2px solid ${focusedField === name ? '#007bff' : '#ddd'}`,
            borderRadius: '10px',
            fontSize: '14px',
            backgroundColor: focusedField === name ? '#fff' : '#f9f9f9',
            transition: 'all 0.3s ease',
            outline: 'none',
            boxSizing: 'border-box',
            boxShadow: focusedField === name ? '0 0 0 3px rgba(0, 123, 255, 0.1)' : 'none'
          }}
        />
      </div>
    </motion.div>
  );
}

export default function QuoteForm() {
  const [formData, setFormData] = useState({
    // destination: '',
    name: '',
    phone: '',
    email: '',
    message: '',
    agreed: false
  });

  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Quote request submitted! Our holiday expert will contact you soon.');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  return (
    <section style={{
      position: 'relative',
      width: '100%',
      overflow: 'hidden',
      padding: '60px 20px',
      backgroundColor: '#fff',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {/* Decorative Blurs */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '-120px',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'rgba(0, 123, 255, 0.05)',
        filter: 'blur(80px)',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '-120px',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'rgba(0, 123, 255, 0.05)',
        filter: 'blur(80px)',
      }} />

      <div style={{
        position: 'relative',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        backgroundColor: '#fff',
        borderRadius: '20px',
        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px',
        overflow: 'hidden'
      }}>
        <div style={{
          display: 'flex',
          minHeight: '550px'
        }}>
          {/* LEFT COLUMN - Form (40% width) */}
          <div style={{ 
            flex: '0 0 40%',
            padding: '48px 40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              style={{ marginBottom: '32px' }}
            >
              <h2 style={{
                fontSize: '32px',
                fontWeight: '700',
                color: '#000',
                margin: '0 0 12px',
                lineHeight: '1.2'
              }}>
                Contact US
              </h2>
              <p style={{ 
                color: '#777', 
                fontSize: '14px',
                lineHeight: '1.6',
                margin: 0
              }}>
                Please share your details below and our holiday expert will get in touch with you.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              onSubmit={handleSubmit}
            >


              {/* Name and Phone Row */}
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: '20px',
                flexWrap: 'wrap'
              }}>
                <FormField
                  icon={User}
                  label="Name"
                  name="name"
                  type="text"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
                <FormField
                  icon={Phone}
                  label="Phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>

              {/* Email */}
              <div style={{ marginBottom: '20px' }}>
                <FormField
                  icon={Mail}
                  label="Email ID"
                  name="email"
                  type="email"
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  focusedField={focusedField}
                  setFocusedField={setFocusedField}
                />
              </div>

              {/* Message */}
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
                  Message
                </label>
                <div style={{ position: 'relative' }}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Tell us about your travel plans..."
                    rows="4"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      border: `2px solid ${focusedField === 'message' ? '#007bff' : '#ddd'}`,
                      borderRadius: '10px',
                      fontSize: '14px',
                      backgroundColor: focusedField === 'message' ? '#fff' : '#f9f9f9',
                      transition: 'all 0.3s ease',
                      outline: 'none',
                      boxSizing: 'border-box',
                      boxShadow: focusedField === 'message' ? '0 0 0 3px rgba(0, 123, 255, 0.1)' : 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit'
                    }}
                  />
                </div>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.5 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: '0 6px 20px rgba(0, 123, 255, 0.3)'
                }}
                whileTap={{ scale: 0.98 }}
                style={{
                  width: '100%',
                  padding: '14px 32px',
                  backgroundColor: 'black',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '10px',
                  fontWeight: '600',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)'
                }}
              >
                <span>Submit Request</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  →
                </motion.span>
              </motion.button>
            </motion.form>
          </div>

          {/* RIGHT COLUMN - Graphics Area (60% width) */}
          <div style={{ 
            flex: '0 0 60%',
            backgroundColor: '#f8f9fa',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '48px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            <div style={{
              textAlign: 'center',
              color: '#999',
              fontSize: '14px'
            }}>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}