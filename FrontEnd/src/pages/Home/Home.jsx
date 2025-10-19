import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// -------------------- STYLES --------------------
import styles from "./Home.module.css";

// -------------------- COMPONENT IMPORTS --------------------
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import { BannerComp } from "../../components/ui/BannerComp";
import { Packages } from "../../components/ui/Packages";
import Services from "../../components/Services/Services";
import FAQs from "../../components/FAQ/FAQ";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import Footer from "../../components/Footer/Footer";
import ContactForm from "../../components/Contact/Contact";
import DiwaliPopUp from "../../components/DiwaliPopUp/DiwaliPopUp";

// -------------------- VIDEO ASSETS --------------------
import Diwali from "/videos/DiwaliOffers.mp4";
import Corporate from "/videos/CorporateTours.mp4";
import Family from "/videos/FamilyTours.mp4";
import HomeHero from "/videos/Hero.mp4";

// -------------------- DATA FILES --------------------
import FamilyJSON from "../../assets/data/familyPackage.json";
import budgetFriendlyJSON from "../../assets/data/budgetFriendly.json";
import CorporateJSON from "../../assets/data/corporate.json";
import HoneyMoon from '../../assets/data/honeyMoon.json'

// =====================================================
//                     HOME COMPONENT
// =====================================================

function Home() {
  const location = useLocation();
  const [showDiwaliPopup, setShowDiwaliPopup] = useState(false);

  // Show Diwali popup after 1 second
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowDiwaliPopup(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // If navigation included state requesting a scroll, or a hash is present, scroll
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
      {/* Diwali Popup */}
      {/* <DiwaliPopUp 
        isOpen={showDiwaliPopup} 
        onClose={() => setShowDiwaliPopup(false)} 
      /> */}

      <div className={styles.homePageContainer}>
        {/* -------------------- NAVBAR & HERO -------------------- */}
        <NavBar />
        {/* <Hero src={Corporate}  showContent={true}  /> */}

        <div className={styles.FamilyHero}>
          <Hero videoSrc={HomeHero} showContent={true} />
        </div>

        {/* <CarouselComp /> */}

        {/* -------------------- Page Content -------------------- */}
        <div className={styles.pageContainer}>
          {/* --------------------Diwali Section-------------------- */}
          {/* <div className={styles.DiwaliComponent}> */}
            <video
              className={styles.diwaliBanner}
              src={Diwali}
              autoPlay
              muted
              loop
              playsInline
            >
              Your Browser does not support this video format
            </video>
            {/* <CardCouresel /> */}
          {/* </div> */}

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

          {/* -------------------- SERVICES SECTION -------------------- */}
          <div id="services" style={{ width: "100%", paddingTop: "90px", marginTop: "-90px" }}>
            <Services />
          </div>

          {/* -------------------- CORPORATE TOURS SECTION -------------------- */}
          <div className={styles.HomeContainer}>
            <BannerComp
              src={Corporate}
              heading="Corporate Tours"
              subHeading="Enjoy your best time with your Company"
              buttonText="More Corporate Packages →"
              buttonLink="/packages/corporate"
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
              buttonLink="/packages/honeymoon"
            />
            <div className={styles.ExpandableCard}>
              <Packages src={HoneyMoon} />
            </div>
          </div>

          {/* -------------------- BUDGET FRIENDLY SECTION -------------------- */}
          <div className={styles.HomeContainer}>
            <BannerComp
              src={Corporate}
              heading="Budget Friendly"
              subHeading="Enjoy your best time with your Partner"
              buttonText="More Honeymoon Packages →"
              buttonLink="/packages/honeymoon"
            />
            <div className={styles.ExpandableCard}>
              <Packages src={budgetFriendlyJSON} />
            </div>
          </div>

          {/* -------------------- FAQ SECTION -------------------- */}
          <div className={styles.FAQSection}>
            <FAQs />
          </div>

          {/* -------------------- QUOTE FORM -------------------- */}
          <div id="Question" style={{ width: "100%", paddingTop: "90px", marginTop: "-90px" }}>
            <QuoteForm />
          </div>

          <ContactForm />
        </div>

        {/* -------------------- FOOTER -------------------- */}
        <Footer />
      </div>
    </>
  );
}

export default Home;
