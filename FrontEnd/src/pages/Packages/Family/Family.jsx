import React from "react";
import { motion } from "framer-motion";

// -------------------- STYLES ------------------------
import styles from "./Family.module.css";

// -------------------- COMPONENT IMPORTS -------------
import NavBar from "../../../components/NavBar/NavBar";
import Hero from "../../../components/Hero/Hero";
import BannerVideo from "../../../components/BannerVideo/BannerVideo";
import CardCouresel from "../../../components/CardCarousel/CardCouresel";
import { BannerComp } from "../../../components/ui/BannerComp";
import { Packages } from "../../../components/ui/Packages";
import Services from "../../../components/Services/Services";
import FAQs from "../../../components/FAQ/FAQ";
import QuoteForm from "../../../components/QuoteForm/QuoteForm";
import Footer from "../../../components/Footer/Footer";
// import CarouselComp from "../../components/Carousel/CarouselComp";
import ResponsivePackageGrid from "../../../components/SinglePackage/ResponsiveGrid";
import SinglePackage from "../../../components/SinglePackage/SinglePackage";

// --------------------- Dynamic Components -----------
// import { ResponsivePackageGrid} from "../../components/SinglePackage/SinglePackage";

// -------------------- VIDEO ASSETS ------------------
import Diwali from "/videos/DiwaliOffers.mp4";
import Corporate from "/videos/CorporateTours.mp4";
import Family from "/videos/FamilyTours.mp4";

// -------------------- DATA FILES --------------------
import FamilyJSON from "../../../assets/data/familyPackage.json";
import budgetFriendlyJSON from "../../../assets/data/budgetFriendly.json";
import CorporateJSON from "../../../assets/data/corporate.json";
import packagesData from "../../../assets/Packages/FamilyPackages.json";

// =====================================================
//                     Family Packages
// =====================================================

function FamilyPage() {
  return (
    <>
      <div className={styles.homePageContainer}>
        {/* -------------------- NAVBAR & HERO -------------------- */}
        <NavBar />
        <div className={styles.FamilyHero}>
          <Hero videoSrc={Family} showContent={false} />
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "40%",
              height: "80%",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              top: "10rem",
              left: "5rem",
              zIndex: 2,
              color: "white",
              fontFamily: "Poppins, sans-serif",
            }}
          >
            <div style={{ fontSize: "35px", fontWeight: "600" }}>
              Family Tours
            </div>
            <div style={{ fontSize: "18px", fontWeight: "400" }}>
              Enjoy your best time with your Family
            </div>
          </div>
        </div>
        {/* <CarouselComp /> */}

        {/* -------------------- Page Content -------------------- */}
        <div className={styles.pageContainer}>
          <ResponsivePackageGrid>
            {packagesData.map((pkg) => (
              <SinglePackage
                key={pkg.id}
                src={pkg.src}
                location={pkg.location}
                pricing={pkg.pricing}
                link={pkg.link}
              />
            ))}
          </ResponsivePackageGrid>

          {/* -------------------- QUOTE FORM -------------------- */}
          {/* <QuoteForm /> */}

          {/* -------------------- SERVICES SECTION -------------------- */}
          {/* <Services /> */}

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
              <Packages src={budgetFriendlyJSON} />
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
          {/* -------------------- QUOTE FORM -------------------- */}
          <div id="Question" style={{ width: "100%" }}>
            <QuoteForm />
          </div>
        </div>

        {/* -------------------- FOOTER -------------------- */}
        <Footer />
      </div>
    </>
  );
}

export default FamilyPage;
