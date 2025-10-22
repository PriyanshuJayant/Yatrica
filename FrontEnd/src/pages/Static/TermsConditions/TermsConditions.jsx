import React from 'react';
import styles from '../../pages.module.css';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';

function TermsConditions() {
  return (
    <>
      <NavBar />
      <div className={styles.staticPageContainer}>
        <div className={styles.container}>
          <div className={styles.content}>
            <header className={styles.header}>
              <h1 className={styles.title}>Terms & Conditions - Yatrica New Year Offer</h1>
              <div className={styles.meta}>
                <p>Effective Date: October 18, 2025</p>
                <p>Last Updated: October 18, 2025</p>
              </div>
            </header>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Offer Details</h2>
              <ul className={styles.list}>
                <li>Customers can enjoy <b>zero convenience charges</b> on all domestic and international flight bookings made through Yatrica during the offer period.</li>
                <li>Get up to <b>₹5,000 off</b> on select holiday packages, applicable on both domestic and international destinations.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Offer Validity</h2>
              <ul className={styles.list}>
                <li>This offer is <b>valid till 31st January 2026</b>.</li>
                <li>Bookings made after 31st January 2026 will not be eligible for this promotion, regardless of travel dates.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Eligibility & Conditions</h2>
              <ul className={styles.list}>
                <li>The offer is applicable only on bookings made through <b>Yatrica's authorized representatives</b>.</li>
                <li>Package discounts may vary depending on destination, duration, and availability.</li>
                <li>The offer <b>cannot be combined</b> with any other promotion, coupon, or discount code.</li>
                <li>In case of cancellation or modification, the standard Yatrica cancellation policy will apply, and any offer benefit availed may be forfeited.</li>
                <li>Yatrica reserves the right to <b>modify or withdraw the offer</b> at any time without prior notice.</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>4. General Terms</h2>
              <ul className={styles.list}>
                <li>All offers are subject to <b>availability</b> and applicable government taxes.</li>
                <li>Yatrica shall not be responsible for any delay, technical glitch, or failure beyond its control.</li>
                <li>By availing of this offer, the customer agrees to abide by these terms and Yatrica's general booking conditions.</li>
              </ul>
            </section>

            
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Contact Information</h2>
              <p className={styles.paragraph}>
                For questions about this offer, please contact us at:
              </p>
              <p className={styles.paragraph}>
                <strong>Yatrica</strong><br />
                Email: info@yatrica.co.in<br />
                Phone: +91 (981) 845-6811<br />
                Address: Sipri Bazar, Jhansi, Uttar Pradesh-284003
              </p>
            </section>

          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TermsConditions;
