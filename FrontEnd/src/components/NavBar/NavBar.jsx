import React from "react";
import { Link } from "react-router-dom";
import styles from "./NavBar.module.css";

function NavBar() {
  return (
    <>
      <header className={styles.navbarContainer}>
        <div className={styles.leftSection}>
          <Link to="/" className={styles.logoLink}>
            <div className={styles.logoImage}>
              <img
                src="../../../public/images/Logo3.png"
                alt="Company Logo"
                className={styles.logo}
              />
            </div>
          </Link>
        </div>

        <div className={styles.rightSection}>
          <nav className={styles.navLinksSection}>
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

          <div className={styles.contactSection}>
            <a href="tel:+91999999999" className={styles.contactButton}>
              <button className={styles.contactBtn}>
                <i className="fa fa-phone"></i> +91 9999 99999
              </button>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}

export default NavBar;