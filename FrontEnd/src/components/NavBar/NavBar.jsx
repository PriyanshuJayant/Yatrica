import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate, // <- modern helper
} from "framer-motion";

function NavBar() {
  const { scrollYProgress } = useScroll();

  // Use scroll progress so it's responsive across screen sizes.
  // Here, first 20% of page scroll maps to full blur (0 -> 8px).
  const blur = useTransform(scrollYProgress, [0, 0.2], [0, 8]);
  const backdrop = useMotionTemplate`blur(${blur}px)`;
  const bg = useTransform(
    scrollYProgress,
    [0, 0.2],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.15)"]
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setIsMenuOpen(false);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "unset";
    return () => { document.body.style.overflow = "unset"; };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        className={styles.navbarContainer}
        style={{
          background: bg,
          backdropFilter: backdrop,
          WebkitBackdropFilter: backdrop,
          zIndex: 1000,
        }}
      >
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoImage}>
              <img src="/images/Logo3.png" alt="Company Logo" className={styles.logo} />
            </div>
          </Link>
        </div>

        <div className={styles.rightSection}>
          <nav className={`${styles.navLinksSection} ${isMobile ? styles.hidden : ""}`}>
            <Link to="/" className={styles.navLink}>Home</Link>
            <Link to="/packages" className={styles.navLink}>Packages</Link>
            <Link to="/services" className={styles.navLink}>Services</Link>
            <Link to="/about-us" className={styles.navLink}>About Us</Link>
            <Link to="/book-now" className={styles.navLink}>Book Now</Link>
          </nav>

          <div className={`${styles.contactSection} ${isMenuOpen ? styles.contactHidden : ""}`}>
            <a href="tel:+91999999999" className={styles.contactButton}>
              <button className={styles.contactBtn}>
                <i className="fa fa-phone"></i>
                <span className={styles.phoneText}>+91 9999 99999</span>
              </button>
            </a>
          </div>

          {isMobile && (
            <div className={styles.hamburgerContainer}>
              <button
                className={`${styles.hamburger} ${isMenuOpen ? styles.hamburgerActive : ""}`}
                onClick={() => setIsMenuOpen(v => !v)}
                aria-label="Toggle menu"
              >
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
                <span className={styles.hamburgerLine}></span>
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu & Overlay */}
        {isMobile && (
          <>
            <div className={`${styles.overlay} ${isMenuOpen ? styles.overlayActive : ""}`} onClick={() => setIsMenuOpen(false)} />
            <div className={`${styles.mobileMenu} ${isMenuOpen ? styles.mobileMenuActive : ""}`}>
              <nav className={styles.mobileNavLinks}>
                <Link to="/" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link to="/packages" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Packages</Link>
                <Link to="/services" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Services</Link>
                <Link to="/about-us" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>About Us</Link>
                <Link to="/book-now" className={styles.mobileNavLink} onClick={() => setIsMenuOpen(false)}>Book Now</Link>
              </nav>
            </div>
          </>
        )}
      </motion.header>
    </>
  );
}

export default NavBar;
