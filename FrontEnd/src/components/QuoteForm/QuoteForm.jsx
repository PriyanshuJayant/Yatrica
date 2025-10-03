import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plane, MapPin, User, Phone, Mail, Sparkles } from 'lucide-react';

export default function QuoteForm() {
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
    alert('Quote request submitted! Our holiday expert will contact you soon.');
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const iconVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: {
      scale: [1, 1.2, 1],
      rotate: [0, 10, -10, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3
      }
    }
  };

  const styles = {
    container: {
      // minHeight: '100vh',
      padding: '32px 16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    mainWrapper: {
      width: '100%',
      maxWidth: '700px'
    },
    headerCard: {
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      padding: '32px',
      marginBottom: '24px',
      position: 'relative',
      overflow: 'hidden'
    },
    iconBox: {
      width: '64px',
      height: '64px',
      background: 'linear-gradient(135deg, #CAE9F5 0%, #57caf1ff 100%)',
      borderRadius: '16px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: '24px',
      boxShadow: '0 10px 30px rgba(68, 188, 235, 0.3)'
    },
    heading: {
      fontSize: '36px',
      fontWeight: 'bold',
      background: 'linear-gradient(135deg, #000000ff 0%, #000000ff 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      backgroundClip: 'text',
      marginBottom: '12px'
    },
    subheading: {
      color: '#6b7280',
      fontSize: '16px',
      lineHeight: '1.6'
    },
    formCard: {
      backgroundColor: 'white',
      borderRadius: '24px',
      boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
      padding: '32px',
      position: 'relative',
      overflow: 'hidden'
    },
    row: {
      display: 'flex',
      gap: '24px',
      marginBottom: '24px',
      flexWrap: 'wrap'
    },
    fieldWrapper: {
      flex: '1',
      minWidth: '250px'
    },
    label: {
      display: 'block',
      fontSize: '12px',
      fontWeight: '600',
      color: '#374151',
      marginBottom: '8px',
      letterSpacing: '0.5px'
    },
    required: {
      color: '#ea3333ff'
    },
    inputWrapper: {
      position: 'relative'
    },
    icon: {
      position: 'absolute',
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#9ca3af',
      pointerEvents: 'none',
      zIndex: 1
    },
    input: {
      width: '100%',
      padding: '14px 16px 14px 48px',
      border: '2px solid #e5e7eb',
      borderRadius: '12px',
      fontSize: '15px',
      backgroundColor: '#f9fafb',
      transition: 'all 0.3s ease',
      outline: 'none',
      boxSizing: 'border-box'
    },
    inputFocused: {
      // borderColor: '#2E8FB2',
      backgroundColor: 'white',
      boxShadow: '0 0 0 3px hsla(188, 87%, 59%, 0.13)'
    },
    checkboxWrapper: {
      marginBottom: '24px'
    },
    checkboxLabel: {
      display: 'flex',
      alignItems: 'flex-start',
      cursor: 'pointer',
      gap: '12px'
    },
    checkbox: {
      width: '20px',
      height: '20px',
      border: '2px solid #d1d5db',
      borderRadius: '4px',
      cursor: 'pointer',
      flexShrink: 0,
      marginTop: '2px',
      accentColor: '#9333ea'
    },
    checkboxText: {
      fontSize: '14px',
      color: '#6b7280',
      lineHeight: '1.5'
    },
    link: {
      color: '#2563eb',
      fontWeight: '500',
      textDecoration: 'none'
    },
    button: {
      padding: '16px 48px',
      background: 'linear-gradient(135deg, #2E8Fb2 0%, #2563eb 100%)',
      color: 'white',
      fontWeight: 'bold',
      fontSize: '16px',
      borderRadius: '9999px',
      border: 'none',
      cursor: 'pointer',
      boxShadow: '0 10px 30px rgba(147, 51, 234, 0.3)',
      transition: 'all 0.3s ease',
      display: 'inline-flex',
      alignItems: 'center',
      gap: '8px',
      position: 'relative',
      overflow: 'hidden'
    },
    sparkle: {
      position: 'absolute',
      top: '40px',
      right: '40px',
      zIndex: 1
    }
  };

  return (
    <div style={styles.container}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={styles.mainWrapper}
      >
        {/* Header Section */}
        <motion.div
          variants={itemVariants}
          style={styles.headerCard}
        >
          {/* Animated Background Blob */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: '256px',
              height: '256px',
              background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(37, 99, 235, 0.2))',
              borderRadius: '50%',
              filter: 'blur(60px)',
              opacity: 0.6
            }}
            animate={{
              scale: [1, 1.2, 1],
              x: [0, 20, 0],
              y: [0, -20, 0]
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          
          <div style={{ position: 'relative', zIndex: 2 }}>
            <motion.div
              variants={iconVariants}
              initial="initial"
              animate="animate"
              style={styles.iconBox}
            >
              <Plane size={32} color="white" />
            </motion.div>
            
            <motion.h1
              variants={itemVariants}
              style={styles.heading}
            >
              Get a quote
            </motion.h1>
            
            <motion.p
              variants={itemVariants}
              style={styles.subheading}
            >
              Please share your details below and our holiday expert will get in touch with you.
            </motion.p>
          </div>
        </motion.div>

        {/* Form Section */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          style={styles.formCard}
        >
          {/* Destination and Departure City Row */}
          <motion.div variants={itemVariants} style={styles.row}>
            <div style={styles.fieldWrapper}>
              <label style={styles.label}>
                DESTINATION<span style={styles.required}>*</span>
              </label>
              <motion.div
                style={styles.inputWrapper}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <MapPin size={20} style={styles.icon} />
                <input
                  type="text"
                  name="destination"
                  value={formData.destination}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('destination')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Hong Kong"
                  style={{
                    ...styles.input,
                    ...(focusedField === 'destination' ? styles.inputFocused : {})
                  }}
                  required
                />
              </motion.div>
            </div>

            <div style={styles.fieldWrapper}>
              <label style={styles.label}>
                DEPARTURE CITY<span style={styles.required}>*</span>
              </label>
              <motion.div
                style={styles.inputWrapper}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Plane size={20} style={styles.icon} />
                <input
                  type="text"
                  name="departureCity"
                  value={formData.departureCity}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('departureCity')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="New Delhi"
                  style={{
                    ...styles.input,
                    ...(focusedField === 'departureCity' ? styles.inputFocused : {})
                  }}
                  required
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Name and Phone Row */}
          <motion.div variants={itemVariants} style={styles.row}>
            <div style={styles.fieldWrapper}>
              <label style={styles.label}>
                NAME<span style={styles.required}>*</span>
              </label>
              <motion.div
                style={styles.inputWrapper}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <User size={20} style={styles.icon} />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('name')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Name"
                  style={{
                    ...styles.input,
                    ...(focusedField === 'name' ? styles.inputFocused : {})
                  }}
                  required
                />
              </motion.div>
            </div>

            <div style={styles.fieldWrapper}>
              <label style={styles.label}>
                PHONE<span style={styles.required}>*</span>
              </label>
              <motion.div
                style={styles.inputWrapper}
                whileFocus={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Phone size={20} style={styles.icon} />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Phone Number"
                  style={{
                    ...styles.input,
                    ...(focusedField === 'phone' ? styles.inputFocused : {})
                  }}
                  required
                />
              </motion.div>
            </div>
          </motion.div>

          {/* Email */}
          <motion.div variants={itemVariants} style={{ marginBottom: '24px' }}>
            <label style={styles.label}>
              EMAIL ID<span style={styles.required}>*</span>
            </label>
            <motion.div
              style={styles.inputWrapper}
              whileFocus={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Mail size={20} style={styles.icon} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                placeholder="Email"
                style={{
                  ...styles.input,
                  ...(focusedField === 'email' ? styles.inputFocused : {})
                }}
                required
              />
            </motion.div>
          </motion.div>

          {/* Checkbox */}
          <motion.div variants={itemVariants} style={styles.checkboxWrapper}>
            <label style={styles.checkboxLabel}>
              <motion.input
                type="checkbox"
                name="agreed"
                checked={formData.agreed}
                onChange={handleChange}
                style={styles.checkbox}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                required
              />
              <span style={styles.checkboxText}>
                I have read and agree to the{' '}
                <a href="#" style={styles.link}>
                  User Agreement
                </a>{' '}
                &{' '}
                <a href="#" style={styles.link}>
                  Privacy Policy
                </a>
                .
              </span>
            </label>
          </motion.div>

          {/* Submit Button */}
          <motion.button
            type="submit"
            variants={itemVariants}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 20px 40px rgba(147, 51, 234, 0.4)"
            }}
            whileTap={{ scale: 0.98 }}
            style={styles.button}
          >
            <span>Submit</span>
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              →
            </motion.span>
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
}