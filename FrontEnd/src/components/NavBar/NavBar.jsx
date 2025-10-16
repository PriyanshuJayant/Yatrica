import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { ChevronDown } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionTemplate,
  AnimatePresence,
} from "framer-motion";

function NavBar() {
  const { scrollYProgress } = useScroll();
  const [isMobileNavBar, setIsMobileNavBar] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobileNavBar(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const bg = useTransform(
    scrollYProgress,
    [0, isMobileNavBar? 0.03 : 0.1],
    ["rgba(255,255,255,0)", "rgba(255, 255, 255, 1)"]
  );

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMenuOpen]);

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10, pointerEvents: "none" },
    visible: {
      opacity: 1,
      y: 0,
      pointerEvents: "auto",
      transition: { duration: 0.25, ease: "easeOut" },
    },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } },
  };
  useEffect(() => {
    if (location.state?.scrollTo) {
      // Small timeout to ensure page has loaded
      setTimeout(() => {
        const element = document.getElementById(location.state.scrollTo);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 100);

      // Clear the state to prevent scrolling on back navigation
      window.history.replaceState({}, document.title);
    }
  }, [location]);
  return (
    <>
      <motion.header
        className={styles.navbarContainer}
        style={{
          background: bg,
          zIndex: 1000,
        }}
      >
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
          <nav
            className={`${styles.navLinksSection} ${
              isMobile ? styles.hidden : ""
            }`}
          >
            <Link to="/" className={styles.navLink}>
              Home
            </Link>

            <div
              style={{
                position: "relative",
                display: "inline-block",
              }}
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <Link
                to="/packages"
                className={styles.navLink}
                style={{ display: "inline-flex", alignItems: "center" }}
              >
                Packages
                <motion.span
                  style={{
                    marginLeft: "5px",
                    position: "relative",
                    display: "inline-flex",
                    transformOrigin: "center",
                    fontSize: "15px",
                    transform: isDropdownOpen
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.2s ease",
                  }}
                >
                  {/* ▼ */}
                  <ChevronDown />
                </motion.span>
              </Link>

              {/* Dropdown menu with framer-motion */}
              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    variants={dropdownVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    style={{
                      position: "absolute",
                      top: "100%",
                      background: "white",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                      borderRadius: "8px",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      minWidth: "180px",
                      padding: "8px 0",
                      zIndex: 2000,
                    }}
                  >
                    <Link
                      to="/packages/family"
                      className={styles.navLink}
                      style={{
                        padding: "10px 16px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "15px",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "white")
                      }
                    >
                      Family Packages
                    </Link>
                    <Link
                      to="/packages/corporate"
                      className={styles.navLink}
                      style={{
                        padding: "10px 16px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "15px",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "white")
                      }
                    >
                      Corporate Packages
                    </Link>
                    <Link
                      to="/packages/honeymoon"
                      className={styles.navLink}
                      style={{
                        padding: "10px 16px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "15px",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "white")
                      }
                    >
                      Honeymoon
                    </Link>{" "}
                    <Link
                      to="/packages/budget"
                      className={styles.navLink}
                      style={{
                        padding: "10px 16px",
                        color: "#333",
                        textDecoration: "none",
                        fontSize: "15px",
                        transition: "background 0.2s ease",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background = "#f5f5f5")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background = "white")
                      }
                    >
                      Budget
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a
              href="#services"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === "/") {
                  const el = document.getElementById("services");
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  navigate("/", { state: { scrollTo: "services" } });
                }
              }}
            >
              Services
            </a>
            <a
              href="#Question"
              className={styles.navLink}
              onClick={(e) => {
                e.preventDefault();
                if (location.pathname === "/") {
                  const el = document.getElementById("Question");
                  if (el)
                    el.scrollIntoView({ behavior: "smooth", block: "start" });
                } else {
                  navigate("/", { state: { scrollTo: "Question" } });
                }
              }}
            >
              Ask Question
            </a>
            <Link to="/contact" className={styles.navLink}>
              Book Now
            </Link>
          </nav>

          <div
            className={`${styles.contactSection} ${
              isMenuOpen ? styles.contactHidden : ""
            }`}
          >
            <a href="tel:+91 9818456811" className={styles.contactButton}>
              <button className={styles.contactBtn}>
                <i className="fa fa-phone"></i>
                <span className={styles.phoneText}>+91 98184 56811 </span>
              </button>
            </a>
          </div>

          {isMobile && (
            <div className={styles.hamburgerContainer}>
              <button
                className={`${styles.hamburger} ${
                  isMenuOpen ? styles.hamburgerActive : ""
                }`}
                onClick={() => setIsMenuOpen((v) => !v)}
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
            <div
              className={`${styles.overlay} ${
                isMenuOpen ? styles.overlayActive : ""
              }`}
              onClick={() => setIsMenuOpen(false)}
            />
            <div
              className={`${styles.mobileMenu} ${
                isMenuOpen ? styles.mobileMenuActive : ""
              }`}
            >
              <nav className={styles.mobileNavLinks}>
                <Link
                  to="/"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Home
                </Link>
                <Link
                  to="/packages"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Packages
                </Link>
                <a
                  href="#services"
                  className={styles.mobileNavLink}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsMenuOpen(false);

                    if (location.pathname === "/") {
                      const el = document.getElementById("services");
                      if (el)
                        el.scrollIntoView({
                          behavior: "smooth",
                          block: "start",
                        });
                    } else {
                      navigate("/", { state: { scrollTo: "services" } });
                    }
                  }}
                >
                  Services
                </a>
                <Link
                  to="/about-us"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  About Us
                </Link>
                <Link
                  to="/book-now"
                  className={styles.mobileNavLink}
                  onClick={() => setIsMenuOpen(false)}
                >
                  Book Now
                </Link>
              </nav>
            </div>
          </>
        )}
      </motion.header>
    </>
  );
}

export default NavBar;
