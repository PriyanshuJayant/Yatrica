import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plane, MapPin, User, Phone, Mail, Sparkles, Loader2, CheckCircle, XCircle } from 'lucide-react';

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

export default function ContactForm() {
  const [formData, setFormData] = useState({
    destination: '',
    departureCity: '',
    name: '',
    phone: '',
    email: '',
    agreed: false
  });

  const [focusedField, setFocusedField] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      const response = await fetch('/api/sendQuote', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          destination: formData.destination,
          departureCity: formData.departureCity,
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Quote request sent successfully! Our travel expert will contact you soon.',
        });
        // Reset form
        setFormData({
          destination: '',
          departureCity: '',
          name: '',
          phone: '',
          email: '',
          agreed: false,
        });
      } else {
        setSubmitStatus({
          type: 'error',
          message: data.error || 'Failed to send quote request. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error submitting quote form:', error);
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please check your connection and try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
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
        <div style={{ flex: '1 1 40%', minWidth: '300px' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '48px' }}
          >
            <div style={{
              display: 'inline-block',
              padding: '4px 12px',
              border: '1px solid #007bff',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: '500',
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              color: '#007bff',
              marginBottom: '12px'
            }}>
              Have any Question ?
            </div>
            
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#000',
              margin: '0 0 8px'
            }}>
              Get a Quote
            </h2>
            
            <p style={{ 
              color: '#777', 
              fontSize: '14px',
              lineHeight: '1.6'
            }}>
              Please share your details below and our holiday expert will get in touch with you.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            style={{
              maxWidth: '400px',
              textAlign: 'left',
              padding: '24px',
              borderRadius: '10px',
              backgroundColor: '#f9f9f9'
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2
              }}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 123, 255, 0.1)',
                color: '#007bff',
                marginBottom: '12px'
              }}
            >
              <Plane size={16} />
            </motion.div>
            
            <p style={{ fontWeight: 600, margin: '0 0 4px' }}>
              Why Choose Us?
            </p>
            <p style={{ color: '#666', fontSize: '13px', marginBottom: '12px' }}>
              Expert travel planning, personalized itineraries, and 24/7 support for your perfect holiday.
            </p>
          </motion.div>
        </div>

        {/* RIGHT COLUMN - Form */}
        <div style={{ flex: '1 1 55%', minWidth: '300px' }}>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            onSubmit={handleSubmit}
            style={{
              backgroundColor: '#fff',
              padding: '0'
            }}
          >
            {/* Destination and Departure City Row */}
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '20px',
              flexWrap: 'wrap'
            }}>
              <FormField
                icon={MapPin}
                label="Destination"
                name="destination"
                type="text"
                placeholder="Hong Kong"
                value={formData.destination}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
              <FormField
                icon={Plane}
                label="Departure City"
                name="departureCity"
                type="text"
                placeholder="New Delhi"
                value={formData.departureCity}
                onChange={handleChange}
                focusedField={focusedField}
                setFocusedField={setFocusedField}
              />
            </div>

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

            {/* Checkbox */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.4 }}
              style={{ marginBottom: '24px' }}
            >
              <label style={{
                display: 'flex',
                alignItems: 'flex-start',
                cursor: 'pointer',
                gap: '10px'
              }}>
                <input
                  type="checkbox"
                  name="agreed"
                  checked={formData.agreed}
                  onChange={handleChange}
                  required
                  style={{
                    width: '18px',
                    height: '18px',
                    border: '2px solid #d1d5db',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    flexShrink: 0,
                    marginTop: '2px',
                    accentColor: '#007bff'
                  }}
                />
                <span style={{
                  fontSize: '13px',
                  color: '#666',
                  lineHeight: '1.5'
                }}>
                  I have read and agree to the{' '}
                  <a href="/user-agreement" style={{
                    color: '#007bff',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}>
                    User Agreement
                  </a>
                  .
                </span>
              </label>
            </motion.div>

            {/* Status Messages */}
            <AnimatePresence>
              {submitStatus.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    padding: '14px 18px',
                    borderRadius: '8px',
                    marginBottom: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    backgroundColor: submitStatus.type === 'success' ? '#d4edda' : '#f8d7da',
                    color: submitStatus.type === 'success' ? '#155724' : '#721c24',
                    border: `1px solid ${submitStatus.type === 'success' ? '#c3e6cb' : '#f5c6cb'}`,
                  }}
                >
                  {submitStatus.type === 'success' ? (
                    <CheckCircle size={20} style={{ flexShrink: 0 }} />
                  ) : (
                    <XCircle size={20} style={{ flexShrink: 0 }} />
                  )}
                  <span style={{ fontSize: '14px', lineHeight: '1.5' }}>
                    {submitStatus.message}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={isSubmitting}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={!isSubmitting ? { 
                scale: 1.02,
                boxShadow: '0 6px 20px rgba(0, 123, 255, 0.3)'
              } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}
              style={{
                padding: '14px 32px',
                backgroundColor: isSubmitting ? '#6c757d' : '#61daffff',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '15px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: isSubmitting ? 'none' : '0 4px 12px rgba(0, 123, 255, 0.2)',
                opacity: isSubmitting ? 0.7 : 1
              }}
              onMouseOver={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = '#4cc3e0';
              }}
              onMouseOut={(e) => {
                if (!isSubmitting) e.target.style.backgroundColor = '#61daffff';
              }}
            >
              {isSubmitting ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                  >
                    <Loader2 size={18} />
                  </motion.div>
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <span>Submit Request</span>
                  <motion.span
                    animate={{ x: [0, 4, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                </>
              )}
            </motion.button>
          </motion.form>
        </div>
      </div>
    </section>
  );
}