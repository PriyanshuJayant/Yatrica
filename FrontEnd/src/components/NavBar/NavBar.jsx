import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) {
        setIsMenuOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle menu toggle
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Close menu when clicking on a link
  const handleLinkClick = () => {
    setIsMenuOpen(false);
  };

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={styles.navbarContainer}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoImage}>
              <img
                src="/images/Logo3.png"
                alt="Company Logo"
                className={styles.logo}
              />
            </div>
          </Link>
        </div>

        <div className={styles.rightSection}>
          {/* Desktop Navigation */}
          <nav className={`${styles.navLinksSection} ${isMobile ? styles.hidden : ''}`}>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>

            <Link to="/packages" className={styles.navLink}>
              Packages
            </Link>

            <Link to="/services" className={styles.navLink}>
              Services
            </Link>

            <Link to="/about-us" className={styles.navLink}>
              About Us
            </Link>

            <Link to="/book-now" className={styles.navLink}>
              Book Now
            </Link>
          </nav>

          {/* Contact Button */}
          <div className={`${styles.contactSection} ${isMenuOpen ? styles.contactHidden : ''}`}>
            <a href="tel:+91999999999" className={styles.contactButton}>
              <button className={styles.contactBtn}>
                <i className="fa fa-phone"></i> 
                <span className={styles.phoneText}>+91 9999 99999</span>
              </button>
            </a>
          </div>

          {/* Mobile Hamburger Menu */}
          {isMobile && (
            <div className={styles.hamburgerContainer}>
              <button 
                className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ''}`}
                onClick={toggleMenu}
                aria-label="Toggle menu"
              >
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMobile && (
          <>
            <div 
              className={`${styles.overlay} ${isMenuOpen ? styles.overlayActive : ''}`}
              onClick={toggleMenu}
            ></div>
            
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuActive : ''}`}>
              <nav className={styles.mobileNavLinks}>
                <Link 
                  to="/" 
                  className={styles.mobileNavLink}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>

                <Link 
                  to="/packages" 
                  className={styles.mobileNavLink}
                  onClick={handleLinkClick}
                >
                  Packages
                </Link>

                <Link 
                  to="/services" 
                  className={styles.mobileNavLink}
                  onClick={handleLinkClick}
                >
                  Services
                </Link>

                <Link 
                  to="/about-us" 
                  className={styles.mobileNavLink}
                  onClick={handleLinkClick}
                >
                  About Us
                </Link>

                <Link 
                  to="/book-now" 
                  className={styles.mobileNavLink}
                  onClick={handleLinkClick}
                >
                  Book Now
                </Link>
              </nav>
            </div>
          </>
        )}
      </header>
    </>
  );
}

export default NavBar;