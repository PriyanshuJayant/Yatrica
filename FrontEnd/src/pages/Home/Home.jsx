import React from "react";
import { motion } from "framer-motion";
import { BannerComp } from "../../components/ui/BannerComp";
import { Packages } from "../../components/ui/Packages";
import styles from "./Home.module.css";
import NavBar from "../../components/NavBar/NavBar";
import Hero from "../../components/Hero/Hero";
import BannerVideo from "../../components/BannerVideo/BannerVideo";
import CardCouresel from "../../components/CardCarousel/CardCouresel";
import QuoteForm from "../../components/QuoteForm/QuoteForm";
import CarouselComp from "../../components/Carousel/CarouselComp";
import Diwali from "/videos/DiwaliOffers.mp4";
import Corporate from "/videos/CorporateTours.mp4";
import Family from "/videos/FamilyTours.mp4";
import FAQs from '../../components/FAQ/FAQ'
import Footer from "../../components/Footer/Footer";
import FamilyJSON from "../../assets/data/familyPackage.json";
import budgetFriendlyJSON from "../../assets/data/budgetFriendly.json";
import CorporateJSON from '../../assets/data/corporate.json'


function Home() {
  return (
    <>
      <div>
        <NavBar />
        <Hero />
        <div className={styles.pageContainer}>
          {/* <CarouselComp /> */}
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
          <CardCouresel />

          <div className={styles.HomeContainer}>
            <BannerComp
              src={Family}
              heading="Family Tours"
              subHeading="Enjoy your best time with your Family"
              buttonText="More Corporate Packages →"
            />
            {/* Family Packages Section */}
            <div className={styles.ExpandableCard}>
              <Packages src={FamilyJSON} />
            </div>
          </div>

          <div className={styles.HomeContainer}>
            <BannerComp
              src={Corporate}
              heading="Corporate Tours"
              subHeading="Enjoy your best time with your Company"
              buttonText="More Corporate Packages →"
            />
            {/* Family Packages Section */}
            <div className={styles.ExpandableCard}>
              <Packages src={CorporateJSON} />
            </div>
          </div>

          <div className={styles.HomeContainer}
            // Edit Section
            style={{height:"400px", marginBottom:"20rem"}} 
          >
            <BannerComp
              // src={Corporate}
              src="https://www.pexels.com/download/video/9374869/"
              heading="Honeymoon"
              subHeading="Enjoy your best time with your Partner"
              buttonText="More Honeymoon Packages →"
            />
            {/* Family Packages Section */}
            <div className={styles.ExpandableCard}>
              <Packages src={budgetFriendlyJSON} />
            </div>
          </div>
          <FAQs/>
          <QuoteForm />
        </div>

        <Footer/>
      </div>
    </>
  );
}

export default Home;
