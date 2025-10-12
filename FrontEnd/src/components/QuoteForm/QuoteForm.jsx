import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, User, Phone, Mail, Sparkles } from 'lucide-react';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('Contact request submitted! Our holiday expert will contact you soon.');
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
      {/* Decorative Blurs */}
      <div style={{
        position: 'absolute',
        top: '80px',
        left: '-120px',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'rgba(0, 123, 255, 0.05)',
        filter: 'blur(80px)'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '80px',
        right: '-120px',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'rgba(0, 123, 255, 0.05)',
        filter: 'blur(80px)'
      }} />

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
                  <a href="#" style={{
                    color: '#007bff',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}>
                    User Agreement
                  </a>
                  {' '}and{' '}
                  <a href="#" style={{
                    color: '#007bff',
                    fontWeight: '500',
                    textDecoration: 'none'
                  }}>
                    Privacy Policy
                  </a>
                  .
                </span>
              </label>
            </motion.div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: '0 6px 20px rgba(0, 123, 255, 0)'
              }}
              whileTap={{ scale: 0.98 }}
              style={{
                padding: '14px 32px',
                backgroundColor: '#61daffff',
                color: '#fff',
                border: 'none',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '15px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(0, 123, 255, 0.2)'
              }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#61daffff'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#61daffff'}
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
      </div>
    </section>
  );
}