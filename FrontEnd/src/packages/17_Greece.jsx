import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// -------------------- STYLES --------------------
import styles from "./0_Global.module.css";

// -------------------- COMPONENT IMPORTS --------------------
import NavBar from "../components/NavBar/NavBar";
import QuoteForm from "../components/QuoteForm/QuoteForm";
import Footer from "../components/Footer/Footer";

// -------------------- VIDEO ASSETS --------------------
import HomeHero from "/videos/Hero.mp4";

// -------------------- DATA FILES --------------------
import singlePackages from "../assets/singlePackages.json";

// =====================================================
//                     HOME COMPONENT
// =====================================================

function ID17() {
  const location = useLocation();
  const [pkg, setPkg] = useState(null);

  // Load Thailand package (id: "1")
  useEffect(() => {
    const thailandPkg = singlePackages.find((p) => p.id === "17");
    setPkg(thailandPkg || null);
  }, []);

  useEffect(() => {
    const scrollTarget =
      location.state?.scrollTo ||
      (location.hash ? location.hash.replace("#", "") : null);
    if (scrollTarget) {
      setTimeout(() => {
        const el = document.getElementById(scrollTarget);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    }
  }, [location]);

  return (
    <>
      <div className={styles.homePageContainer}>
        <NavBar />
        {/* -------------------- Page Content -------------------- */}
        {!pkg ? (
          <div className={styles.pageContainer}>
            <div className={styles.loading}>Loading package details...</div>
          </div>
        ) : (
          <>
            {/* Hero Image & Header */}
            <div className={styles.packageHeader}>
              <img
                className={styles.heroImage}
                src={pkg.image}
                alt={pkg.title}
              />
              <div className={styles.headerOverlay}>
                <span className={styles.categoryBadge}>{pkg.category}</span>
                <h1 className={styles.packageTitle}>{pkg.title}</h1>
                <p className={styles.packageDescription}>{pkg.description}</p>
              </div>
            </div>
            <div className={styles.pageContainer}>
              <section className={styles.packageSection}>

              {/* Package Options */}
              <div className={styles.optionsContainer}>
                <h2 className={styles.sectionTitle}>Available Packages</h2>
                <div className={styles.optionsGrid}>
                  {pkg.options?.map((opt) => (
                    <article key={opt.id} className={styles.optionCard}>
                      <div className={styles.optionCardHeader}>
                        <h3 className={styles.optionDuration}>{opt.duration}</h3>
                        <button className={styles.bookBtn}>Book Now</button>
                      </div>
                      <div className={styles.itinerarySection}>
                        <h4 className={styles.itineraryTitle}>Day-by-Day Itinerary</h4>
                        <ol className={styles.itineraryList}>
                          {opt.itinerary?.map((day, idx) => (
                            <li key={idx} className={styles.itineraryItem}>
                              <span className={styles.dayNumber}>Day {idx + 1}</span>
                              <span className={styles.dayDetails}>{day}</span>
                            </li>
                          ))}
                        </ol>
                      </div>
                    </article>
                  ))}
                </div>
              </div>

              {/* Call to Action */}
              <div className={styles.ctaSection}>
                <h2 className={styles.ctaTitle}>Ready to Explore {pkg.title}?</h2>
                <p className={styles.ctaSubtitle}>
                  Contact us to customize your perfect itinerary
                </p>
                <button className={styles.ctaButton}>Get a Free Quote</button>
              </div>
              </section>
            </div>
          </>
        )}
        <Footer />
      </div>
    </>
  );
}

export default ID17;