import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import styles from '../../pages.module.css';
import quotePage from '../../../assets/data/quotePage.json';
import ContactForm from '../../../components/QuoteForm/QuoteForm';

function QuotePage() {
  const { hero } = quotePage;

  return (
    <>
      <NavBar />
      {/* Hero Header Section */}
      <div className={styles.packageHeader}>
        <img
          className={styles.heroImage}
          src={hero.image}
          alt={hero.title}
        />
        <div className={styles.headerOverlay}>
          <span className={styles.categoryBadge}>{hero.category}</span>
          <h1 className={styles.packageTitle}>{hero.title}</h1>
          <p className={styles.packageDescription}>{hero.description}</p>
        </div>
      </div>
      
      <div className={styles.contactPageContainer}>
        {/* <ContactPage/> */}
        <ContactForm/>
      </div>
      <Footer />
    </>
  );
}

export default QuotePage;