import { useEffect, useState } from "react";
import { useLocation ,Link} from "react-router-dom";

// -------------------- STYLES --------------------
import styles from "./0_Global.module.css";

// -------------------- COMPONENT IMPORTS --------------------
import NavBar from "../components/NavBar/NavBar";
import QuoteForm from "../components/QuoteForm/QuoteForm";
import Footer from "../components/Footer/Footer";
import { LazySection } from "../components/LazySection/LazySection";
import { useSinglePackageData } from "../context/DataCacheContext";

// -------------------- DATA FILES --------------------

// =====================================================
//                     HOME COMPONENT
// =====================================================

function ID17() {
  const location = useLocation();
  const { data: pkg, loading } = useSinglePackageData("17");


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

  // Format price with Indian Rupee symbol
  const formatPrice = (price) => {
    if (!price || isNaN(price)) {
      return "₹0";
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(price);
  };

  const formatDuration = (duration) => {
    if (!duration) return '';
    return duration
      .replace(/(\d+)N/g, '$1 Nights')
      .replace(/(\d+)D/g, '$1 Days');
  };

  return (
    <>
      <div className={styles.homePageContainer}>
        <NavBar />
        {/* -------------------- Page Content -------------------- */}
        {loading || !pkg ? (
          <div className={styles.pageContainer}>
            <div className={styles.loading}>
              {loading ? 'Loading package details...' : 'Package not found'}
            </div>
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
                        <div className={styles.durationPriceWrapper}>
                          <div className={styles.priceDisplay}>
                            <span className={styles.priceLabel}>
                              Starting from
                            </span>
                            <h3 className={styles.priceAmount}>
                              {formatPrice(opt.price)}
                            </h3>
                          </div>
                        </div>
                        <Link to="/quote"> <button className={styles.bookBtn}>Get Quote</button> </Link>
                      </div>
                      <div className={styles.itinerarySection}>
                        <h4 className={styles.itineraryTitle}>{formatDuration(opt.duration)}</h4>
                        <ol className={styles.itineraryList}>
                          {opt.itinerary?.map((day, idx) => (
                            <li key={idx} className={styles.itineraryItem}>
                              <span className={styles.dayNumber}>
                                Day {idx + 1}
                              </span>
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
                <Link to="/quote"> <button className={styles.ctaButton}>Get a Free Quote</button> </Link>
              </div>
              </section>
            </div>
          </>
        )}
        <LazySection minHeight="200px">
          <Footer />
        </LazySection>
      </div>
    </>
  );
}

export default ID17;