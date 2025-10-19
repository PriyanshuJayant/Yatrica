import React from 'react';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';
import styles from './ContactPage.module.css'
import ContactPage from '../../../components/Contact/Contact';
import contactData from '../../../assets/data/contactPage.json';

function UserAgreement() {
  const { hero } = contactData;

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
      
      <div className={styles.pageContainer}>
        <ContactPage/>
      </div>
      <Footer />
    </>
  );
}

export default UserAgreement;