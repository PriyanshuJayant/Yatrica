// -------------------- STYLES ------------------------
import styles from "./ContactPage.module.css";

// -------------------- COMPONENT IMPORTS -------------
import NavBar from "../../../components/NavBar/NavBar";
import Footer from "../../../components/Footer/Footer";

// =====================================================
//                     Corporate Packages
// =====================================================

function ContactPage() {
  return (
    <>
      <div className={styles.homePageContainer}>
        {/* -------------------- NAVBAR & HERO -------------------- */}
        <NavBar />

        {/* -------------------- FOOTER -------------------- */}
        <Footer />
      </div>
    </>
  );
}

export default ContactPage;
