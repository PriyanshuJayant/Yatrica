// import React from 'react';
// import styles from '../UserAgreement/UserAgreement.module.css';
// import NavBar from '../../../components/NavBar/NavBar';
// import Footer from '../../../components/Footer/Footer';

// function PrivacyPolicy() {
//   return (
//     <>
//       <NavBar />
//       <div className={styles.pageContainer}>
//         <div className={styles.container}>
//           <div className={styles.content}>
//             <header className={styles.header}>
//               <h1 className={styles.title}>Privacy Policy</h1>
//               <div className={styles.meta}>
//                 <p>Effective Date: October 18, 2025</p>
//                 <p>Last Updated: October 18, 2025</p>
//               </div>
//             </header>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>1. Introduction</h2>
//               <p className={styles.paragraph}>
//                 We respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, store, and protect your data when you use our website and submit quote requests.
//               </p>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
//               <p className={styles.paragraph}>
//                 When you submit a quote request through our website, we collect the following information:
//               </p>
//               <ul className={styles.list}>
//                 <li><strong>Destination:</strong> Your intended travel destination</li>
//                 <li><strong>Departure City:</strong> Your city of departure</li>
//                 <li><strong>Name:</strong> Your full name</li>
//                 <li><strong>Phone Number:</strong> Your contact telephone number</li>
//                 <li><strong>Email Address:</strong> Your email address for correspondence</li>
//                 <li><strong>Additional Information:</strong> Any other details you provide in your inquiry</li>
//               </ul>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
//               <p className={styles.paragraph}>
//                 We use your personal information for the following purposes:
//               </p>
              
//               <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>3.1 Quote Processing</h3>
//               <ul className={styles.list}>
//                 <li>To review and process your travel quote request</li>
//                 <li>To understand your travel needs and preferences</li>
//                 <li>To prepare personalized travel recommendations</li>
//               </ul>

//               <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>3.2 Communication</h3>
//               <ul className={styles.list}>
//                 <li>To send you an automated confirmation email upon receipt of your request</li>
//                 <li>To contact you via email or phone with travel quotes and recommendations</li>
//                 <li>To respond to your questions and provide customer support</li>
//                 <li>To provide updates about your inquiry</li>
//               </ul>

//               <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>3.3 Business Operations</h3>
//               <ul className={styles.list}>
//                 <li>To maintain records of customer inquiries</li>
//                 <li>To improve our services and website functionality</li>
//                 <li>To analyze trends and customer preferences</li>
//               </ul>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>4. How We Share Your Information</h2>
              
//               <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>4.1 Internal Use</h3>
//               <p className={styles.paragraph}>Your information is shared with:</p>
//               <ul className={styles.list}>
//                 <li>Our travel experts who will process your quote request</li>
//                 <li>Customer service representatives who may assist with your inquiry</li>
//                 <li>Authorized personnel who need access to provide you with services</li>
//               </ul>

//               <h3 className={styles.sectionTitle} style={{ fontSize: '18px', marginTop: '24px' }}>4.2 Third Parties</h3>
//               <p className={styles.paragraph}>
//                 We do not sell, rent, or trade your personal information to third parties for marketing purposes. We may share your information only:
//               </p>
//               <ul className={styles.list}>
//                 <li>With travel service providers (hotels, airlines, tour operators) as necessary to fulfill your quote request</li>
//                 <li>With email service providers to deliver communications to you</li>
//                 <li>When required by law or legal process</li>
//                 <li>To protect our rights, property, or safety</li>
//               </ul>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>5. Data Storage and Retention</h2>
//               <ul className={styles.list}>
//                 <li>Your information is stored securely on our systems</li>
//                 <li>We retain your data for as long as necessary to provide you with services and respond to your inquiries</li>
//                 <li>We may retain your information for a reasonable period for business records and legal compliance</li>
//                 <li>You may request deletion of your data at any time (subject to legal retention requirements)</li>
//               </ul>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>6. Email Communications</h2>
//               <p className={styles.paragraph}>When you submit a quote request:</p>
//               <ul className={styles.list}>
//                 <li>You will automatically receive a confirmation email acknowledging your submission</li>
//                 <li>Our team will send you follow-up emails with travel quotes and information</li>
//                 <li>You may receive additional communications related to your inquiry</li>
//                 <li>You may opt out of future marketing communications at any time</li>
//               </ul>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>7. Data Security</h2>
//               <p className={styles.paragraph}>
//                 We implement reasonable security measures to protect your personal information, including:
//               </p>
//               <ul className={styles.list}>
//                 <li>Secure data transmission protocols</li>
//                 <li>Access controls and authentication measures</li>
//                 <li>Regular security assessments</li>
//                 <li>Employee training on data protection</li>
//               </ul>
//               <p className={styles.paragraph}>
//                 However, no method of transmission or storage is 100% secure, and we cannot guarantee absolute security.
//               </p>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>8. Your Rights</h2>
//               <p className={styles.paragraph}>Depending on your jurisdiction, you may have the following rights:</p>
//               <ul className={styles.list}>
//                 <li><strong>Access:</strong> Request access to your personal information</li>
//                 <li><strong>Correction:</strong> Request correction of inaccurate information</li>
//                 <li><strong>Deletion:</strong> Request deletion of your personal information</li>
//                 <li><strong>Objection:</strong> Object to certain processing of your data</li>
//                 <li><strong>Portability:</strong> Request transfer of your data to another service</li>
//               </ul>
//               <p className={styles.paragraph}>
//                 To exercise these rights, please contact us using the information provided below.
//               </p>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>9. Cookies and Tracking</h2>
//               <p className={styles.paragraph}>
//                 Our website may use cookies and similar technologies to enhance user experience. For details about our cookie usage, please refer to our Cookie Policy or contact us for more information.
//               </p>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>10. Children's Privacy</h2>
//               <p className={styles.paragraph}>
//                 Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information from children. If you believe we have inadvertently collected information from a minor, please contact us immediately.
//               </p>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>11. International Data Transfers</h2>
//               <p className={styles.paragraph}>
//                 If you are accessing our website from outside our country of operation, please be aware that your information may be transferred to, stored, and processed in our country of operation. By using our services, you consent to such transfers.
//               </p>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>12. Changes to This Privacy Policy</h2>
//               <p className={styles.paragraph}>
//                 We may update this Privacy Policy from time to time. We will notify you of significant changes by posting the new Privacy Policy on our website with an updated "Last Updated" date. Your continued use of our services after changes constitutes acceptance of the updated policy.
//               </p>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>13. Contact Us</h2>
//               <p className={styles.paragraph}>
//                 If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
//               </p>
//               <p className={styles.paragraph}>
//                 <strong>Yatrica Travel</strong><br />
//                 Email: info@yatricatravel.com<br />
//                 Phone: +91 (000) 000-0000<br />
//                 Address: [Your Business Address]
//               </p>
//             </section>

//             <section className={styles.section}>
//               <h2 className={styles.sectionTitle}>14. Consent</h2>
//               <p className={styles.paragraph}>
//                 By submitting a quote request through our website, you explicitly consent to:
//               </p>
//               <ul className={styles.list}>
//                 <li>The collection and processing of your personal information as described in this Privacy Policy</li>
//                 <li>Receiving email communications from us regarding your quote request</li>
//                 <li>The terms outlined in our User Agreement</li>
//               </ul>
//             </section>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// }

// export default PrivacyPolicy;
