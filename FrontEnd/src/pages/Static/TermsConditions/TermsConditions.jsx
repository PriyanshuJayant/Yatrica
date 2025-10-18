import React from 'react';
import styles from '../UserAgreement/UserAgreement.module.css';
import NavBar from '../../../components/NavBar/NavBar';
import Footer from '../../../components/Footer/Footer';

function TermsConditions() {
  return (
    <>
      <NavBar />
      <div className={styles.pageContainer}>
        <div className={styles.container}>
          <div className={styles.content}>
            <header className={styles.header}>
              <h1 className={styles.title}>Terms and Conditions</h1>
              <div className={styles.meta}>
                <p>Effective Date: October 18, 2025</p>
                <p>Last Updated: October 18, 2025</p>
              </div>
            </header>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>1. Acceptance of Terms</h2>
              <p className={styles.paragraph}>
                By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these Terms and Conditions, please do not use our website or services.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>2. Use of Website</h2>
              <p className={styles.paragraph}>
                This website is intended to provide information about travel packages and services. By using this site, you agree to:
              </p>
              <ul className={styles.list}>
                <li>Use the website for lawful purposes only</li>
                <li>Not engage in any activity that could damage, disable, or impair the website</li>
                <li>Not attempt to gain unauthorized access to any portion of the website</li>
                <li>Not use automated systems or software to extract data from the website</li>
                <li>Provide accurate and truthful information when submitting forms or making inquiries</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>3. Booking and Reservations</h2>
              
              <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>3.1 Quote Requests</h3>
              <ul className={styles.list}>
                <li>Quote requests submitted through our website are not binding reservations</li>
                <li>All quotes are subject to availability and confirmation</li>
                <li>Prices quoted are valid for the period specified and may change without notice</li>
                <li>Final booking confirmation requires acceptance of our booking terms and payment</li>
              </ul>

              <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>3.2 Payment Terms</h3>
              <ul className={styles.list}>
                <li>Payment terms will be specified in your booking confirmation</li>
                <li>Full payment may be required before travel dates</li>
                <li>We accept various payment methods as specified during booking</li>
                <li>All prices are in the currency specified unless otherwise stated</li>
              </ul>

              <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>3.3 Cancellation Policy</h3>
              <ul className={styles.list}>
                <li>Cancellation policies vary by package and service provider</li>
                <li>Cancellation fees may apply as per the specific terms of your booking</li>
                <li>Refunds, if applicable, will be processed according to our refund policy</li>
                <li>Force majeure events may affect cancellation terms</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>4. Travel Documents and Requirements</h2>
              <p className={styles.paragraph}>
                It is your responsibility to ensure you have:
              </p>
              <ul className={styles.list}>
                <li>Valid passport with required validity period</li>
                <li>Appropriate visas for all destinations</li>
                <li>Required vaccinations and health certificates</li>
                <li>Travel insurance as recommended or required</li>
                <li>Any other documents required by airlines, hotels, or destinations</li>
              </ul>
              <p className={styles.paragraph}>
                We are not responsible for any issues arising from failure to obtain proper documentation.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>5. Pricing and Availability</h2>
              <ul className={styles.list}>
                <li>All prices displayed are subject to availability and confirmation</li>
                <li>We reserve the right to correct pricing errors on our website</li>
                <li>Prices may vary based on travel dates, seasons, and demand</li>
                <li>Additional fees, taxes, and surcharges may apply</li>
                <li>Currency exchange rates may affect final pricing</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>6. Travel Services</h2>
              
              <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>6.1 Third-Party Providers</h3>
              <p className={styles.paragraph}>
                We work with various third-party service providers including airlines, hotels, tour operators, and transportation companies. These providers have their own terms and conditions which you must also comply with.
              </p>

              <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>6.2 Service Changes</h3>
              <ul className={styles.list}>
                <li>Travel itineraries may be subject to change due to circumstances beyond our control</li>
                <li>We will make reasonable efforts to provide alternative arrangements</li>
                <li>Service providers may modify schedules, routes, or accommodations</li>
                <li>We are not liable for changes made by third-party providers</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>7. Limitation of Liability</h2>
              <p className={styles.paragraph}>
                To the fullest extent permitted by law:
              </p>
              <ul className={styles.list}>
                <li>We are not liable for delays, cancellations, or changes by service providers</li>
                <li>We are not responsible for personal injury, illness, or property damage during travel</li>
                <li>We are not liable for acts of God, force majeure, or circumstances beyond our control</li>
                <li>Our liability is limited to the amount paid for the specific service in question</li>
                <li>We are not liable for consequential, indirect, or incidental damages</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>8. Travel Insurance</h2>
              <p className={styles.paragraph}>
                We strongly recommend that all travelers purchase comprehensive travel insurance covering:
              </p>
              <ul className={styles.list}>
                <li>Trip cancellation and interruption</li>
                <li>Medical expenses and emergency evacuation</li>
                <li>Lost or delayed baggage</li>
                <li>Personal liability</li>
                <li>Any activity-specific coverage as needed</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>9. Health and Safety</h2>
              <ul className={styles.list}>
                <li>Travelers must assess their own fitness for proposed activities</li>
                <li>Pre-existing medical conditions should be disclosed to insurers</li>
                <li>Follow all safety instructions provided by guides and operators</li>
                <li>Check travel advisories for your destinations</li>
                <li>Comply with local laws, customs, and regulations</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>10. Intellectual Property</h2>
              <p className={styles.paragraph}>
                All content on this website, including but not limited to text, images, logos, graphics, photographs, videos, and software, is the property of our company or our licensors and is protected by copyright, trademark, and other intellectual property laws.
              </p>
              <ul className={styles.list}>
                <li>You may not reproduce, distribute, or modify any content without permission</li>
                <li>Unauthorized use of our trademarks or branding is prohibited</li>
                <li>Images and descriptions are for reference only and may vary</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>11. User Conduct</h2>
              <p className={styles.paragraph}>
                When using our services or traveling with our packages, you agree to:
              </p>
              <ul className={styles.list}>
                <li>Behave respectfully toward other travelers, guides, and service providers</li>
                <li>Not engage in illegal or inappropriate behavior</li>
                <li>Follow instructions from tour leaders and local authorities</li>
                <li>Respect local cultures, customs, and environments</li>
                <li>Not hold us responsible for the actions of other travelers</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>12. Complaints and Disputes</h2>
              <p className={styles.paragraph}>
                If you have a complaint about our services:
              </p>
              <ul className={styles.list}>
                <li>Report issues immediately to our representative or guide while traveling</li>
                <li>Submit written complaints within 30 days of service completion</li>
                <li>We will investigate and respond to complaints in a timely manner</li>
                <li>Disputes will be resolved through negotiation or mediation where possible</li>
              </ul>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>13. Privacy and Data Protection</h2>
              <p className={styles.paragraph}>
                Your use of this website and our services is also governed by our Privacy Policy. By using our services, you consent to our collection, use, and sharing of your information as described in the Privacy Policy.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>14. Modifications to Terms</h2>
              <p className={styles.paragraph}>
                We reserve the right to modify these Terms and Conditions at any time. Changes will be effective immediately upon posting to this website. Your continued use of our website or services after changes constitutes acceptance of the modified terms.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>15. Governing Law</h2>
              <p className={styles.paragraph}>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of [Your Jurisdiction], without regard to its conflict of law provisions. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in [Your Jurisdiction].
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>16. Severability</h2>
              <p className={styles.paragraph}>
                If any provision of these Terms and Conditions is found to be invalid or unenforceable, the remaining provisions shall continue in full force and effect.
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>17. Contact Information</h2>
              <p className={styles.paragraph}>
                For questions about these Terms and Conditions, please contact us at:
              </p>
              <p className={styles.paragraph}>
                <strong>Yatrica Travel</strong><br />
                Email: info@yatricatravel.com<br />
                Phone: +91 (000) 000-0000<br />
                Address: [Your Business Address]
              </p>
            </section>

            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>18. Entire Agreement</h2>
              <p className={styles.paragraph}>
                These Terms and Conditions, together with our Privacy Policy and User Agreement, constitute the entire agreement between you and our company regarding the use of this website and our services.
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
