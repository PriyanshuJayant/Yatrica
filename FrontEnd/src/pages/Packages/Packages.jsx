// -------------------- STYLES --------------------
import styles from "./Packages.module.css";

// -------------------- COMPONENT IMPORTS --------------------
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import BannerVideo from "../../components/BannerVideo/BannerVideo";
import { BannerComp } from "../../components/ui/BannerComp";
import { Packages } from "../../components/ui/Packages";
import FAQs from "../../components/FAQ/FAQ";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import Footer from "../../components/Footer/Footer";

// -------------------- VIDEO ASSETS --------------------
import Corporate from "/videos/CorporateTours.mp4";
import Family from "/videos/FamilyTours.mp4";
import HomeHero from "/videos/Hero.mp4";

// -------------------- DATA FILES --------------------
import FamilyJSON from "../../assets/data/familyPackage.json";
import budgetFriendlyJSON from "../../assets/data/budgetFriendly.json";
import CorporateJSON from "../../assets/data/corporate.json";

// =====================================================
//                     HOME COMPONENT
// =====================================================

function PackagesPage() {
  return (
    <>
      <div className={styles.homePageContainer}>
        {/* -------------------- NAVBAR & HERO -------------------- */}
        <NavBar />
        <div className={styles.FamilyHero}>
          <Hero videoSrc={HomeHero} showContent={true} />
        </div>

        {/* <CarouselComp /> */}

        {/* -------------------- Page Content -------------------- */}
        <div className={styles.pageContainer}>
          {/* -------------------- FAMILY TOURS SECTION -------------------- */}
          <div className={styles.HomeContainer}>
            <BannerComp
              src={Family}
              heading="Family Tours"
              subHeading="Enjoy your best time with your Family"
              buttonText="More Family Packages →"
              buttonLink="/packages/family"
            />
            <div className={styles.ExpandableCard}>
              <Packages src={FamilyJSON} />
            </div>
          </div>

          {/* -------------------- CORPORATE TOURS SECTION -------------------- */}
          <div className={styles.HomeContainer}>
            <BannerComp
              src={Corporate}
              heading="Corporate Tours"
              subHeading="Enjoy your best time with your Company"
              buttonText="More Corporate Packages →"
            />
            <div className={styles.ExpandableCard}>
              <Packages src={CorporateJSON} />
            </div>
          </div>

          {/* -------------------- HONEYMOON SECTION -------------------- */}
          <div className={styles.HomeContainer}>
            <BannerComp
              src={Corporate}
              heading="Honeymoon"
              subHeading="Enjoy your best time with your Partner"
              buttonText="More Honeymoon Packages →"
            />
            <div className={styles.ExpandableCard}>
              <Packages src={budgetFriendlyJSON} />
            </div>
          </div>
          {/* -------------------- BUDGET FRIENDLY SECTION -------------------- */}
          <div className={styles.HomeContainer}>
            <BannerComp
              src={Corporate}
              heading="Budget Friendly"
              subHeading="Enjoy your best time with your Partner"
              buttonText="More Budget Packages →"
            />
            <div className={styles.ExpandableCard}>
              <Packages src={budgetFriendlyJSON} />
            </div>
          </div>

          {/* -------------------- QUOTE FORM -------------------- */}
          <QuoteForm />

          {/* -------------------- FAQ SECTION -------------------- */}
          <div className={styles.FAQSection}>
            <FAQs />
          </div>
        </div>

        {/* -------------------- FOOTER -------------------- */}
        <Footer />
      </div>
    </>
  );
}

export default PackagesPage;
