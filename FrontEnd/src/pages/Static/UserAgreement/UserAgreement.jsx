import React from 'react';
import styles from './UserAgreement.module.css';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';

function UserAgreement() {
  return (
    <>
      <NavBar />
      <div className={styles.pageContainer}>

      
      <div className={styles.container}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h1 className={styles.title}>User Agreement</h1>
            <div className={styles.meta}>
              <p>Effective Date: October 18, 2025</p>
              <p>Last Updated: October 18, 2025</p>
            </div>
          </header>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
            <p className={styles.paragraph}>
              By submitting a quote request or inquiry through this website, you agree to be bound by this User Agreement. If you do not agree to these terms, please do not use our quote request service.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. Service Description</h2>
            <p className={styles.paragraph}>
              Our website provides information about travel packages and allows you to request personalized quotes for your travel needs. When you submit a quote request, our travel experts will review your information and contact you with tailored travel recommendations.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>3. Use of Services</h2>
            <p className={styles.paragraph}>You agree to:</p>
            <ul className={styles.list}>
              <li>Provide accurate, current, and complete information in all quote request forms</li>
              <li>Use the service only for legitimate travel planning purposes</li>
              <li>Not submit spam, malicious content, or fraudulent information</li>
              <li>Communicate respectfully with our travel experts</li>
              <li>Be at least 18 years of age or have parental/guardian consent to use this service</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>4. Quote Requests</h2>
            <p className={styles.paragraph}>When you submit a quote request:</p>
            <ul className={styles.list}>
              <li>You will receive an automated confirmation email acknowledging receipt of your request</li>
              <li>Our travel experts will review your details and respond with personalized recommendations</li>
              <li>Response times may vary depending on complexity and availability</li>
              <li>Quote requests do not constitute a binding contract or reservation</li>
              <li>All quotes and pricing are subject to availability and may change</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>5. No Guarantee of Service</h2>
            <p className={styles.paragraph}>While we strive to respond to all inquiries promptly, we do not guarantee:</p>
            <ul className={styles.list}>
              <li>Response within a specific timeframe</li>
              <li>Availability of requested travel packages or dates</li>
              <li>Specific pricing or offers</li>
            </ul>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>6. Intellectual Property</h2>
            <p className={styles.paragraph}>
              All content on this website, including text, images, logos, and travel package descriptions, is the property of our company or licensed partners and is protected by copyright and intellectual property laws.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>7. Limitation of Liability</h2>
            <p className={styles.paragraph}>
              To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, consequential, or special damages arising from your use of this website or our services.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>8. Modifications</h2>
            <p className={styles.paragraph}>
              We reserve the right to modify this User Agreement at any time. Continued use of our services after changes constitutes acceptance of the modified terms.
            </p>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>9. Contact</h2>
            <p className={styles.paragraph}>
              For questions about this User Agreement, please contact us through the information provided on our website.
            </p>
          </section>
        </div>
      </div>
      </div>
      <Footer />
    </>
  );
}

export default UserAgreement;