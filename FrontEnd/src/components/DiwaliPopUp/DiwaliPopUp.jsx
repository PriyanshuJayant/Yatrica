import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

function DiwaliPopUp({ isOpen, onClose }) {
  // Close popup on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when popup is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              backdropFilter: 'blur(4px)',
              zIndex: 9998,
              cursor: 'pointer',
            }}
          />

          {/* Popup Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ 
              duration: 0.4,
              ease: [0.34, 1.56, 0.64, 1], // Bouncy spring effect
            }}
            style={{
              position: 'fixed',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              zIndex: 9999,
              width: 'min(500px, 85vw)',
              maxHeight: '85vh',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking modal
          >
            {/* Diwali Image Container */}
            <div
              style={{
                position: 'relative',
                borderRadius: 'clamp(12px, 3vw, 20px)',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
                width: '100%',
                maxHeight: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <img
                src="/images/PopUp/DiwaliPopUp.png"
                alt="Diwali Special Offer"
                style={{
                  width: '100%',
                  height: 'auto',
                  maxHeight: '85vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              style={{
                position: 'absolute',
                top: 'clamp(8px, 2vw, 16px)',
                right: 'clamp(8px, 2vw, 16px)',
                width: 'clamp(36px, 8vw, 44px)',
                height: 'clamp(36px, 8vw, 44px)',
                borderRadius: '50%',
                backgroundColor: 'rgba(255, 255, 255, 0.98)',
                border: '2px solid rgba(185, 28, 28, 0.1)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(185, 28, 28, 0.3)',
                zIndex: 10,
                transition: 'all 0.2s ease',
              }}
              aria-label="Close popup"
            >
              <X size={window.innerWidth < 480 ? 20 : 24} color="#B91C1C" strokeWidth={2.5} />
            </motion.button>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

export default DiwaliPopUp;